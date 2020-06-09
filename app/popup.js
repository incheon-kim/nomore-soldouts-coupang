window.onload = ()=>{
    getOptions();
}

const reloadPage = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}

var options = {};
const getOptions = () => {
    chrome.runtime.sendMessage({msg: "getOptions"}, (res)=>{
        document.getElementById("EnableCheckBox").checked = res.enabled;
        options["enabled"] = res.enabled;
    });
}

const setOptions = () => {
    chrome.runtime.sendMessage({msg: 'setOptions', 'data': options}, (res)=>{
        console.log(res);
        if(res){
            reloadPage();
        }
    })
}

document.addEventListener('change', (evt)=>{
    console.log(evt.target);
    if(evt.target == document.getElementById("EnableCheckBox")){
        options["enabled"] = document.getElementById("EnableCheckBox").checked;
        setOptions();
    }
})