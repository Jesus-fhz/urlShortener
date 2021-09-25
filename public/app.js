//Form Elements
const btn = document.querySelector('#sendData');
let showError = document.querySelector('.show-error');
let newLink = document.querySelector('.new-url');
const loader = document.querySelector('.loading');
const getData = function(){
    btn.addEventListener('click',function(event){
        let url = document.querySelector('#url').value;
        let customName = document.querySelector('#customName').value;
        if(!url){
            clearHtml(showError);
            inserHtml(showError,`Url field can't be empty`)
        }else{
            showError.innerHTML = ''; 
            let data = {url:url, idUrl:customName};
            fetchData(data);
        }
    });
}

const fetchData = async function(data){
    try {
        showLoader();
        if (!data.idUrl) delete data.idUrl;
        const response = await fetch('/url', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        const res = await response.json();
        if(!res.idUrl ){
            clearHtml(showError);
            clearHtml(newLink);
            hideLoader();
            inserHtml(showError, `${res.message}`)
        }else{
            hideLoader();
            clearHtml(newLink);
            let url = window.location+res.idUrl;
            inserHtml(newLink, `<a href="${url}">${url}</a>`)
        }
    } catch (error) {
        hideLoader();
        clearHtml(showError);
        inserHtml(showError, `Something went wrong :C`)
        
    }
}

const clearHtml = function(element){
    element.innerHTML = "";
}

const inserHtml = function (element, markup = ''){
     element.insertAdjacentHTML('afterbegin',markup);
}

const showLoader = function(){
    loader.style.display = 'block';
}
const hideLoader = function(){
    loader.style.display = 'none';
}
 
window.onload = getData();