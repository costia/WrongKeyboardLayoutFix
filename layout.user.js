// ==UserScript==
// @name           WrongKeyboardLayoutFix
// @description    WrongKeyboardLayoutFix
// @include        https://*/*
// @include        http://*/*
// @version        0.04
// @namespace https://github.com/costia/WrongKeyboardLayoutFix
// @updateURL https://github.com/costia/WrongKeyboardLayoutFix/raw/master/layout.user.js
// @downloadURL https://github.com/costia/WrongKeyboardLayoutFix/raw/master/layout.user.js
// @grant        none
// ==/UserScript==

var oldOnKey=null;
var enKeys="qwertyuiopasdfghjkl;zxcvbnm,./'";
var otherKeys="/'קראטוןםפשדגכעיחלךףזסבהנמצתץ.,";
var enableLog=true;

function replaceText(evt) {
    focused=document.activeElement;
    if (oldOnKey){
        oldOnKey(evt);
    }
    if (evt.keyCode == 119) {
        focusedElement=document.activeElement;
        if ((focusedElement.type=="text")||(focusedElement.type=="textarea")){
            inStr=focusedElement.value;
            countEn=0;
            countOther=0;
            for (i=0;i<enKeys.length;i++){
                tempRef=inStr.match(new RegExp("["+enKeys[i]+"]", "g"));
                if (tempRef) countEn+=tempRef.length;
                tempRef=inStr.match(new RegExp("["+otherKeys[i]+"]", "g"));
                if (tempRef) countOther+=tempRef.length;
            }
            outStr='';
            if (countEn>=countOther){
                inKeys=enKeys;
                outKeys=otherKeys;
            }else{
                inKeys=otherKeys;
                outKeys=enKeys;
            }  
            for (i=0;i<inStr.length;i++){
                currLetter=inStr[i];
                var re = new RegExp("["+currLetter+"]");
                if ((match = re.exec(inKeys)) != null) {
                    outStr+=outKeys[match.index];
                    if (enableLog) console.log(outStr[match.index]+"->"+outKeys[i]+"\n");
                }else{
                     outStr+=currLetter;
                }
            }
            focusedElement.value=outStr;
        }
        
    }
};

setTimeout(function(){
    oldOnKey=document.onkeydown;
    document.onkeydown = replaceText;
},1000);

