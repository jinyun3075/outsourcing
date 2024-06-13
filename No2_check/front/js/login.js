document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(getCookie('uInfo'))){
        if(confirm('로그인이 되어있습니다. 로그아웃 하시겠습니까?')){
            deleteCookie('uInfo');
        }else {
            location.href = 'home.html';
        }
    }
    init();
    snsInit();
});

function init(){
    document.querySelector('#login').addEventListener('click',()=>{
        data = {
            user_id: document.querySelector('#id_user').value
            ,user_pw: document.querySelector('#tx_passwd').value
        }
        login(data);
    })
}

function snsInit(){
    // SNS로그인 인증키 입력란
    Kakao.init('인증 키');

    const naverLogin = new naver.LoginWithNaverId(
        {
            clientId: "애플리케이션 ClientID",
            callbackUrl: "콜백 URL",
            loginButton: {color: "green", type: 1, height: 0}
        }
    );
    naverLogin.init(); // 로그인 설정

    naverLogin.getLoginStatus(function (status) {
        if (status) {
            naverSet();
        }
    });
}

function naverSet(){
    let user_id = naverLogin.user.email
    let user_email = naverLogin.user.email
    let user_pw = 'Qwer!234';
    let user_nm = naverLogin.user.nickname
    let image = naverLogin.user.profile_image;

    data = {
        user_id
        ,user_email
        ,user_pw
        ,user_nm
        ,image
    }
    login(data);

}

function loginWithNaver(){
    document.querySelector('#naverIdLogin_loginButton').click();
}

function loginWithKakao() {
    if(Kakao.isInitialized()){
        Kakao.Auth.login({
            success: (authObj) =>{
                console.log(authObj); // access토큰 값
                Kakao.Auth.setAccessToken(authObj.access_token); // access토큰값 저장
                getInfo();
            },
            fail: (err) => {
                console.log(err);
            }
        });
    }
}

function getInfo() {
    Kakao.API.request({
        url: '/v2/user/me',
        success: (res) => {
            let user_id = res.kakao_account.email;
            let user_email = res.kakao_account.email;
            let user_pw = 'Qwer!234';
            let user_nm = res.kakao_account.profile.nickname;
            let image = res.kakao_account.profile.thumbnail_image_url;

            data = {
                user_id
                ,user_email
                ,user_pw
                ,user_nm
                ,image
            }
            login(data);
        },
        fail: function (error) {
            alert('카카오 로그인에 실패했습니다. 관리자에게 문의하세요.' + JSON.stringify(error));
        }
    });
}

function login(data){
    axios.post(`${URL}/user/login`, data)
            .then(res => {
                return res.data;
            })
            .then(data => {
                let expiresDate = new Date();
                expiresDate.setDate(expiresDate.getDate() + 1);
                let cookieString = `uInfo=${JSON.stringify(data)}; expires=${expiresDate.toUTCString()}; path=/`
                document.cookie = cookieString;
                alert('로그인 성공');
                location.href = 'home.html';
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            });
}