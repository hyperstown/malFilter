// ==UserScript==
// @description Filter anime list by only aired/airing shows
// @name        malFilter
// @include     *://myanimelist.net/animelist/*
// @version     v1.0
// ==/UserScript==

let excludeAiring = true;

// Check for storage settings
let onlyAired = localStorage.getItem("onlyAired");
if (onlyAired === null){
    // string because localStorage accepts only strings
    // localStorage.setItem("onlyAired", "false"); 
    onlyAired = "false"
}


// filter elements function
function filterTable(){
    let onlyAiredCheckbox = document.getElementById('onlyAired')
    let rowStyle = null;
    if(onlyAiredCheckbox.checked){
        rowStyle = 'none'
        // localStorage.setItem("onlyAired", "true");
    }
    else{
        // localStorage.setItem("onlyAired", "false");
    }
    let titles = document.getElementsByClassName('content-status');
    for(let i = 0; i < titles.length; i++){
        let status = titles[i].innerHTML;
        if(status.includes('Not Yet Aired')){
            titles[i].parentElement.parentElement.parentElement.style.display = rowStyle;
        }
        if(status.includes('Airing') && excludeAiring){
            titles[i].parentElement.parentElement.parentElement.style.display = rowStyle;
        }
    }
}



// Add new setting element
let newSettingElement = document.createElement('div');
newSettingElement.classList.add('icon-menu')

let checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.id = "onlyAired";
checkbox.checked = JSON.parse(onlyAired);
checkbox.style = "left:13px; top:12px; position:absolute;";
checkbox.onclick = filterTable

let newSettingElementText = document.createElement('span');
newSettingElementText.classList.add('text');
newSettingElementText.appendChild(document.createTextNode('Aired Only'));


newSettingElement.appendChild(checkbox);
newSettingElement.appendChild(newSettingElementText);

document.getElementsByClassName('list-menu-float')[0].appendChild(newSettingElement);


