let layout1 = `
<div>
    <div>
        <a href="detail.html?recipe=#RECIPE">#TITLE</a> <span>#DATE</span>
        <a style="background: #ccc; color: #333;" href="javascript:;" onclick="updateRecipe(#RECIPE)" >수정</a>
        <a style="background: #FF0000; color: #e6e7e8;" href="javascript:;" onclick="deleteRecipe(#RECIPE)">삭제</a>
    </div>
</div>
`
let layout2 = `
<div>
    <div>
        <a href="detail.html?recipe=#RECIPE">#TITLE</a> <span>#DATE</span>
        <a style="background: #FF0000; color: #e6e7e8;" href="javascript:;" onclick="cancelScap(#RECIPE)">삭제</a>
    </div>
</div>
`
document.addEventListener('DOMContentLoaded', ()=>{
    if(!JSON.parse(getCookie('uInfo'))){
        alert('로그인 후 이용해주세요.');
        location.href = 'login.html';
    }    
    init();
});
let scrapList = '';
let listRecipe = '';
function init() {
    let uInfo = JSON.parse(getCookie('uInfo'));
    document.querySelector('#user_name').textContent = `${uInfo.user_nm}님의 마이페이지`
    if(uInfo.image != ''){
        document.querySelector('.profile_img').src = IMGURL + uInfo.image;
    }
    axios.get(`${URL}/recipe/0`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            listRecipe = data;

            axios.get(`${URL}/refrigerate/${JSON.parse(getCookie('uInfo')).idx}`)
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    data.map(d=> scrapList += `${d.recipe_id},` )
                    binding();
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
        .catch(error => {
            if (error.response) {
                alert(error.response.data.message) 
            } else if (error.request) {
                console.log('Error Request:', error.request);
            } else {
                console.log('Error Message:', error.message);
            }
        });

        axios.get(`${URL}/recipe/user/${JSON.parse(getCookie('uInfo')).idx}`)
        .then(res => {
            return res.data;
            })
            .then(data => {
                let area = document.querySelector('#recipeArea');
                let length = 0;
                area.innerHTML = '<h3>작성한 레시피 목록</h3>';
                data.map(o=>{
                    length++;
                    area.insertAdjacentHTML('beforeend',layout1
                        .replace('#TITLE',o.title)
                        .replace('#DATE',o.regdate.split('T')[0])
                        .replaceAll('#RECIPE',o.recipe_id)
                    )

                })
                if(length == 0){
                    area.insertAdjacentHTML('beforeend','<div>아직 작성한 레시피가 없습니다.</div>');
                }
                    
           
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
function binding(){
    let area = document.querySelector('#scrapArea');
    let length = 0;
    area.innerHTML = '<h3>스크랩한 레시피</h3>';
    listRecipe.filter(o=>
        scrapList.indexOf(o.recipe_id) > -1
    )
    .map(o=>{
        length++;
        area.insertAdjacentHTML('beforeend',layout2
                .replace('#TITLE',o.title)
                .replace('#DATE',o.regdate.split('T')[0])
                .replaceAll('#RECIPE',o.recipe_id)
        )
    })
    if(length == 0){
        area.insertAdjacentHTML('beforeend','<div>아직 스크랩한 레시피가 없습니다.</div>');
    }
}

function insertFile(e){
    var formData = new FormData();
    formData.append('file', e.files[0]);
    axios.post(`${URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => {
        return res.data;
    })
    .then(data => {
       e.closest('div').querySelector('img').src = IMGURL+data[0].imageURL
       e.setAttribute("data-value", data[0].imageURL)
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

function updateUser(){
    let data = {
        idx:JSON.parse(getCookie('uInfo')).idx
        ,image:document.querySelector('[name="file"]').getAttribute('data-value')
    }
    axios.post(`${URL}/user/update`,data)
            .then(res => {
                return res.data;
            })
            .then(data => {
                let expiresDate = new Date();
                expiresDate.setDate(expiresDate.getDate() + 1);
                let cookieString = `uInfo=${JSON.stringify(data)}; expires=${expiresDate.toUTCString()}; path=/`
                document.cookie = cookieString;
                alert('수정 완료.')
                location.reload();
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                    check_duplication = true;
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            });
}

function updateRecipe(recipe_id){
    location.href = `write.html?recipe=${recipe_id}`;
}

function cancelScap(recipe_id){
    let data = {
        member_id: JSON.parse(getCookie('uInfo')).idx
        ,recipe_id
    }
    axios.post(`${URL}/recipe/like`,data)
        .then(res => {
            return res.data;
        })
        .then(data => {
            alert(data)
            location.reload();
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

function deleteRecipe(recipe_id){
    if(!confirm('삭제 하시겠습니까?')){
        return;
    }
    data = {
        member_id: JSON.parse(getCookie('uInfo')).idx
        ,recipe_id
    }
    axios.post(`${URL}/recipe/delete`,data)
            .then(res => {
                return res.data;
            })
            .then(data => {
                alert('삭제 완료.')
                location.reload();
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                    check_duplication = true;
                } else if (error.request) {
                    console.log('Error Request:', error.request);
                } else {
                    console.log('Error Message:', error.message);
                }
            });
}