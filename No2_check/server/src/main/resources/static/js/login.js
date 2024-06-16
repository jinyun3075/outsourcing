document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(getCookie('uInfo'))){
        if(confirm('로그인이 되어있습니다. 로그아웃 하시겠습니까?')){
            deleteCookie('uInfo');
        }else {
            location.href = 'home.html';
        }
    }
    init();
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
    try{
        await axios.post(`${URL}/user`, data)
                    .then(res => {
                        return res.data;
                    })
                    .then(data => {
                    })
                    .catch(error => {
                    });
    }catch(err) {
        
    }
    login(data);

}

function loginWithNaver(){
    document.querySelector('#naverIdLogin_loginButton').click();
}

function loginWithKakao() {
    const clientId = 'f6db99ba47e0f0204ef39eab10f3dd72';
    const redirectUri = 'http://localhost:5500/html/login.html';
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&prompt=login`;
    location.href = kakaoLoginUrl;   
}

function getUserInfo() {
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