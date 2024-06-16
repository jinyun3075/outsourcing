const URL2 = 'http://58.141.78.122:3306'
const URL = 'http://localhost'
const IMGURL = `${URL}/upload?fileName=`
const urlParams = new URLSearchParams(location.search);

const kid = '345cf90321f38fbe830b1348ee8718ff'; // kakao id
const nid = '9UfJgA_wfd7R2zL3YLQW'; // naver id

const redirectUri = 'http://localhost:5500/html/login.html';

let naverLogin = '';

window.onload = function() {
    const code = urlParams.get('code');
    if (code) {
        // 인증 코드를 통해 액세스 토큰을 요청
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: kid,
                redirect_uri: redirectUri,
                code: code
            })
        })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            Kakao.Auth.setAccessToken(accessToken);
            // 사용자 정보 요청 함수 호출
            getUserInfo();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('토큰 요청 실패');
        });
    }
    
    const state = window.location.hash;
    if(state){
        naverLogin.getLoginStatus(function (status) {
            if (status) {  
                naverSet();
            }
        });
    }
};

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

    snsInit();
});

function snsInit(){
    try{
        // SNS로그인 인증키 입력란
        Kakao.init(kid);
        naverLogin = new naver.LoginWithNaverId(
            {
                clientId:nid,
                callbackUrl: redirectUri,
                loginButton: {color: "green", type: 1, height: 0},
                isPopup: false,
                callbackHandle: true,
            }
        );
        naverLogin.init();

    }catch(err){
    }
}


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
    document.cookie = "NID_AUT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.naver.com;";
    
    if (Kakao.Auth.getAccessToken()) {
        Kakao.Auth.logout(function() {
            console.log(Kakao.Auth.getAccessToken());
        });
    }
    naverLogin.logout();
    localStorage.removeItem("com.naver.nid.access_token");

    location.reload();
}