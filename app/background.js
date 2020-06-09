'use strict';

chrome.runtime.onMessage.addListener((req, sender, sendResponse)=>{
    var data = req.data;

    switch(req.msg){
        case 'getOptions':
            chrome.storage.sync.get(["options"], (res)=>{
                console.log(res);
                if(Object.keys(res).length === 0){
                    var jsonObj = {};
                    var options = {};

                    options["enabled"] = true;

                    jsonObj["options"] = options;

                    chrome.storage.sync.set(jsonObj, ()=>{
                        sendResponse(options);
                    });
                }else{
                    sendResponse(res["options"]);
                }
            });
            break;
        case 'setOptions':
            var jsonObj = {};
            jsonObj["options"] = data;
            chrome.storage.sync.set(jsonObj, ()=>{
                var error = chrome.runtime.lastError;
                if(error){
                    sendResponse(false);
                }else{
                    sendResponse(true);
                }
                
            });
            break;
        default:
            console.log(req.msg);
        
    }
    return true;
});