var options;
var elems;
var counts;

const loadOptions = () => {
    chrome.runtime.sendMessage({msg: "getOptions"}, (res)=>{
        options = res;
        if(options.enabled){
            getSoldouts();
            removeSoldouts();
            writeCount();
        }        
    });
};

const getSoldouts = () => {
    elems = document.querySelectorAll('.out-of-stock');
    counts = elems.length;
}

const removeSoldouts = ()=>{
    document.querySelectorAll('.out-of-stock').forEach((elem,index)=>{
        elem.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    });
};

const writeCount = () => {
    var title = document.getElementsByClassName('newcx-product-list-title')[0];
    var newElem = document.createElement('div');

    newElem.setAttribute('style', 'color: #0073e9; font-weight:500')
    newElem.innerHTML =`현재 페이지 <b style="font-weight:800;">${counts}</b> 항목 품절입니다...`
    title.appendChild(newElem);
}

loadOptions();