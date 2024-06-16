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
     Kakao.init('345cf90321f38fbe830b1348ee8718ff');

    const naverLogin = new naver.LoginWithNaverId(
        {
            clientId: "9UfJgA_wfd7R2zL3YLQW",
            callbackUrl: "http://localhost/home.html",
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

async function naverSet(){
    
    let user_id = naverLogin.user.email
    let user_email = naverLogin.user.email
    let user_pw = 'Qwer!234';
    let user_nm = naverLogin.user.email
    let image = naverLogin.user.profile_image;

    data = {
        user_id
        ,user_email
        ,user_pw
        ,user_nm
        ,image
    }
    await axios.post(`${URL}/user`, data)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                })
                .catch(error => {
                });
    login(data);

}

function loginWithNaver(){
    document.querySelector('#naverIdLogin_loginButton').click();
}

function loginWithKakao() {
    if(Kakao.isInitialized()){
        Kakao.Auth.login({
            success: (authObj) =>{
                Kakao.Auth.setAccessToken(authObj.access_token);
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
        success: async (res) => {
            let user_id = res.id;
            let user_email = res.id;
            let user_pw = res.id;
            let user_nm = res.id;
            let image = res.id;

            data = {
                user_id
                ,user_email
                ,user_pw
                ,user_nm
                ,image:''
            }
            await axios.post(`${URL}/user`, data)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                })
                .catch(error => {
                });
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