// ==UserScript==
// @name           WrongKeyboardLayoutFix
// @description    WrongKeyboardLayoutFix
// @include        https://*/*
// @include        http://*/*
// @version        0.01
// @namespace https://github.com/costia/WrongKeyboardLayoutFix
// @updateURL https://github.com/costia/WrongKeyboardLayoutFix/raw/master/layout.user.js
// @downloadURL https://github.com/costia/WrongKeyboardLayoutFix/raw/master/layout.user.js
// @grant        none
// ==/UserScript==

var oldOnKey=document.onkeydown;
var enKeys="qwertyuiopasdfghjkl;zxcvbnm,.";
var otherKeys="/'קראטוןםפשדגכעיחלךףזסבהנמצתץ";

document.onkeydown = function(evt) {
    focused=document.activeElement;
    if (oldOnKey){
        oldOnKey(evt);
    }
    if (evt.keyCode == 119) {
        focusedElement=document.activeElement;
        if (focusedElement.type=="text"){
            inStr=focusedElement.value;
            for (i=0;i<enKeys.length;i++){
                inStr=inStr.replace(new RegExp("["+enKeys[i]+"]", "g"),otherKeys[i]);
            }
            focusedElement.value=inStr;
        }
        
    }
};

