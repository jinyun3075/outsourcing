let check_duplication = {
    ID:false
    ,NICK:false
    ,EMAIL:false
};
document.addEventListener('DOMContentLoaded', ()=>{
    init();
});

function init(){
    document.querySelector('#id_user').addEventListener('input', () => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/
        checkInput('id_user', 'idMsg', regex)
        check_duplication.ID = false;
    })

    document.querySelector('#tx_passwd').addEventListener('input', () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        checkInput('tx_passwd', 'pwMsg', regex)
    })

    document.querySelector('#tx_nick').addEventListener('input', () => {
        const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
        checkInput('tx_nick', 'niMsg', regex)
        check_duplication.NICK = false;
    })
    
    document.querySelector('#tx_email').addEventListener('input', () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        checkInput('tx_email', 'emMsg', regex)
        check_duplication.EMAIL = false;
    })
    
    document.querySelector('#check_id').addEventListener('click',() => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        check_dupli('id_user' , regex, 'ID^');
    })

    document.querySelector('#check_nick').addEventListener('click',() => {
        const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
        check_dupli('tx_nick' , regex, 'NICK^');
        
    })

    document.querySelector('#check_email').addEventListener('click',() => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        check_dupli('tx_email' , regex, 'EMAIL^');
    })

    document.querySelector('#signin').addEventListener('click', () => {
        const check_id = document.querySelector(`#idMsg`).style.display
        const check_pw = document.querySelector(`#pwMsg`).style.display
        const check_ni = document.querySelector(`#niMsg`).style.display
        const check_em = document.querySelector(`#emMsg`).style.display

        const user_id = getElement('id_user');
        const user_email = getElement('tx_email');
        const user_nm = getElement('tx_nick');
        const user_pw = getElement('tx_passwd');
        const temp_pw = getElement('tx_passwdChk')
        const pwCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if(check_id == '' && check_pw == '' && check_ni == '' & check_em == ''){
            alert('필수 값을 전부 입력해주세요.')
            return;
        }else if(!check_duplication.ID){
            alert('아이디 중복체크 해주세요.')
            return;
        }else if(!check_duplication.NICK){
            alert('닉네임 중복체크 해주세요.')
            return;
        }else if(!check_duplication.EMAIL){
            alert('이메일 중복체크 해주세요.')
            return;
        }
        else if(user_pw != temp_pw){
            alert('확인 비밀번호와 다릅니다.')
            return;
        }else if(!pwCheck.test(user_pw)){
            alert('비밀 번호 조건을 맞춰 주세요.')
        }
        
        data = {
            user_id
            ,user_email
            ,user_pw
            ,user_nm
            ,image:''
        }
        axios.post(`${URL}/user`, data)
            .then(res => {
                return res.data;
            })
            .then(data => {
                let expiresDate = new Date();
                expiresDate.setDate(expiresDate.getDate() + 1);
                let cookieString = `uInfo=${JSON.stringify(data)}; expires=${expiresDate.toUTCString()}; path=/`
                document.cookie = cookieString;
                alert('회원가입 완료.')
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
        
    })
}

function getElement(target_id){
    return document.querySelector(`#${target_id}`).value
}

function checkInput(target_id, msg_id, regex){
    let text = document.querySelector(`#${target_id}`).value
    const result = regex.test(text);
    if(result){
        document.querySelector(`#${msg_id}`).style.display = 'none';
    }else {
        document.querySelector(`#${msg_id}`).style.display = 'block';
    }
}

function check_dupli(query_id, regex, strCheck){
    strCheck += document.querySelector(`#${query_id}`).value
    const result = regex.test(strCheck.split('^')[1]);
    if(!result){
        alert('조건을 맞춰주세요.')
        return;
    }

    axios.get(`${URL}/user/${strCheck}`)
            .then(res => {
                return res.data;
            })
            .then(data => {
                alert('중복 입니다.')
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                    check_duplication[strCheck.split('^')[0]] = true;
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            });
}