// ==UserScript==
// @name           WrongKeyboardLayoutFix
// @description    WrongKeyboardLayoutFix
// @include        https://*/*
// @include        http://*/*
// @version        0.031
// @namespace https://github.com/costia/WrongKeyboardLayoutFix
// @updateURL https://github.com/costia/WrongKeyboardLayoutFix/raw/master/layout.user.js
// @downloadURL https://github.com/costia/WrongKeyboardLayoutFix/raw/master/layout.user.js
// @grant        none
// ==/UserScript==

var oldOnKey=null;
var enKeys="qwertyuiopasdfghjkl;zxcvbnm,./'";
var otherKeys="/'קראטוןםפשדגכעיחלךףזסבהנמצתץ.,";
var enableLog=false;

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
            for (i=0;i<enKeys.length;i++){
                if (countEn>=countOther){
                    inStr=inStr.replace(new RegExp("["+enKeys[i]+"]", "g"),otherKeys[i]);
                    if (enableLog) console.log("["+enKeys[i]+"]"+"->"+otherKeys[i]+"\n");
                }else{
                    inStr=inStr.replace(new RegExp("["+otherKeys[i]+"]", "g"),enKeys[i]);
                    if (enableLog) console.log("["+otherKeys[i]+"]"+"->"+enKeys[i]+"\n");
                }
            }
            focusedElement.value=inStr;
        }
        
    }
};

setTimeout(function(){
    oldOnKey=document.onkeydown;
    document.onkeydown = replaceText;
},1000);

