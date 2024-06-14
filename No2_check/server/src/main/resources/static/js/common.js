const URL2 = 'http://58.141.78.122:3306'
const URL = 'http://localhost'
const IMGURL = `${URL}/upload?fileName=`
const urlParams = new URLSearchParams(location.search);

document.addEventListener('DOMContentLoaded', ()=>{
    let chk_login = document.querySelectorAll('.chk_login')
    if(getCookie('uInfo')){
        chk_login[1].style.display = 'block';
        chk_login[0].style.display = 'none';
    }else {
        chk_login[0].style.display = 'block';
        chk_login[1].style.display = 'none';    
    }

    let search ='';
    if(urlParams.get('search')){
        search = urlParams.get('search')
    }
    document.querySelector('#srhRecipeText').value = search;
});

function searchHome(){
    location.href = 'home.html?search='+document.querySelector('#srhRecipeText').value
}


function getCookie(str){
    let result = false;
    document.cookie.split(';').find(p=>{   
        if(p != ''){
            let key = p.split('=')[0].trim();
            let value = p.split('=')[1].trim();
            if(str == key){
                result = value
                return true;
            }
        }
        return false;
    })    
    return result;
}
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    naverLogin.logout();
}