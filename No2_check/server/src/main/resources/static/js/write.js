let layout1 = `
<div class="pad_b_25" style="display: flex;">
    <div style="flex: 1; margin-right: 10px;">
        <textarea name="cok_intro1" class="form-control step_cont" style="height:100px; width:100%; resize:none;">#OPTION1</textarea>
    </div>
    <div style="flex: 1;">
        <textarea name="cok_intro2" class="form-control step_cont" style="height:100px; width:100%; resize:none;">#OPTION2</textarea> 
    </div>
</div>`
let layout2 = `
<div class="ui-sortable">
    <div class="step" style="display: flex;">
        <div class="cont_line pad_b_25" style="flex: 1; margin-right: 10px;">
            <p class="cont_tit4">STEP#NUM</p>
            <textarea name="cok_intro" class="form-control step_cont" placeholder="예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요." style="height:100px; width:95%; resize:none;">#CONTENT</textarea>
        </div>
        <div style="display:inline-block;">
            <div is_over="0" class="file-upload-wrapper">
                <img src="#IMAGE" class="file-upload-image" style="cursor:pointer;">
                <input type="file" data-value="#IMAGEVALUE" name="file" class="file-upload-input" onchange="insertFile(this)">
            </div>
        </div>
    </div>                        
</div>
`
let leyout2Num = 2;
document.addEventListener('DOMContentLoaded', ()=>{
    if(!JSON.parse(getCookie('uInfo'))){
        alert('로그인 후 이용해주세요.');
        location.href = 'login.html';
    }
    init();
});

function init() {
    if(urlParams.get('recipe')){
        axios.get(`${URL}/recipe/detail/${urlParams.get('recipe')}`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            document.querySelector('#cok_title').value = data.title || '';
            document.querySelector('#cok_intro').textContent = data.summery || '';
            // document.querySelector('#cok_tip').textContent = data.tip || '';
            document.querySelector('#cok_portion').value = data.userCount || '';
            document.querySelector('#cok_time').value = data.time || '';
            document.querySelector('#cok_degree').value = data.level || '';
            document.querySelector('#mainPhotoHolder').setAttribute('data-value',  data.image || '');
            document.querySelector('#mainPhotoHolder').closest('div').querySelector('img').src = data.image ? IMGURL + data.image : '/img/camera.gif';
            
            document.querySelector('#ingredient_area').innerHTML = '';
            data.ingredient.split('|').map(d=>{
                let option1 = d.split('^')[0];
                let option2 = d.split('^')[1];
                document.querySelector('#ingredient_area')
                    .insertAdjacentHTML('beforeend',layout1
                        .replace('#OPTION1',option1)
                        .replace('#OPTION2',option2)
                    )
            })
            document.querySelector('#seasoning_area').innerHTML = '';
            data.seasoning.split('|').map(d=>{
                let option1 = d.split('^')[0];
                let option2 = d.split('^')[1];
                document.querySelector('#seasoning_area')
                    .insertAdjacentHTML('beforeend',layout1
                        .replace('#OPTION1',option1)
                        .replace('#OPTION2',option2)
                    )
            })

            
            document.querySelector('#divStepArea').innerHTML = '<p class="cont_tit3">요리순서</p>';
            data.recipe_sort.map(p=>{
                document.querySelector('#divStepArea')
                    .insertAdjacentHTML('beforeend',layout2
                        .replace('#NUM',p.step)
                        .replace('#CONTENT',p.content)
                        .replace('#IMAGE', p.image ? IMGURL + p.image :'/img/step_plus.gif')
                        .replace('#IMAGEVALUE', p.image ? p.image: ''))
            })

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
}

function addOption(taget_id){
    document.querySelector(`#${taget_id}`).insertAdjacentHTML('beforeend',layout1
                .replace('#OPTION1','')
                .replace('#OPTION2',''));
}
function addOption2(taget_id){
    let num = document.querySelectorAll(`#${taget_id} .ui-sortable`).length;
    document.querySelector(`#${taget_id}`).insertAdjacentHTML('beforeend',layout2
                .replace('#NUM',num+1)
                .replace('#CONTENT','')
                .replace('#IMAGE','/img/step_plus.gif')
                .replace('#IMAGEVALUE','')
            );
}
function deleteOption(taget_id){
    let e = document.querySelector(`#${taget_id}`);
    let num =0;
    if(taget_id == 'divStepArea'){
        num = document.querySelectorAll(`#${taget_id} .ui-sortable`).length
        if(num < 2) {
            return
        }
    }else{
        num = document.querySelectorAll(`#${taget_id} .pad_b_25`).length
        if(num < 3) {
            return
        }
    }

    e.removeChild(e.lastElementChild);
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
function insertRecipe(type){
    const member_id = JSON.parse(getCookie('uInfo')).idx;
    const title = document.querySelector('#cok_title').value
    const summery = document.querySelector('#cok_intro').value
    // const tip = document.querySelector('#cok_tip').value
    const userCount = document.querySelector('#cok_portion').value
    const time = document.querySelector('#cok_time').value
    const level = document.querySelector('#cok_degree').value
    const image = document.querySelector('#mainPhotoHolder').getAttribute('data-value')
    const visible = type == 'S'?'Y':'N';

    let ingredient = []
    let seasoning = [];
    const recipe_sort = [];
    const ingredient1 = document.querySelectorAll('#ingredient_area [name="cok_intro1"]');
    const ingredient2 = document.querySelectorAll('#ingredient_area [name="cok_intro2"]');
    const seasoning1 = document.querySelectorAll('#seasoning_area [name="cok_intro1"]');
    const seasoning2 = document.querySelectorAll('#seasoning_area [name="cok_intro2"]');

    ingredient1.forEach((data, idx)=>{
        ingredient.push(`${data.value}^${ingredient2[idx].value}`)
    })
    seasoning1.forEach((data, idx)=>{
        seasoning.push(`${data.value}^${seasoning2[idx].value}`)
    })
    ingredient = ingredient.join('|')
    seasoning = seasoning.join('|')

    document.querySelectorAll('#divStepArea [name="cok_intro"]').forEach((data, idx)=> {
        recipe_sort.push({step: idx + 1, content: data.value})
    })

    document.querySelectorAll('#divStepArea [name="file"]').forEach((data, idx)=> {
        console.log(data.getAttribute('data-value'));
        recipe_sort[idx].image = data.getAttribute('data-value');
    })

    let data = {
        member_id
        ,title
        ,summery
        // ,tip
        ,userCount
        ,time
        ,level
        ,image
        ,visible
        ,seasoning
        ,ingredient
        ,score:0
        ,recipe_sort
    }
    let contl = '/recipe'

    if(urlParams.get('recipe')){
        data.recipe_id = urlParams.get('recipe')
        contl = '/recipe/update'
    }

    axios.post(`${URL}${contl}`, data)
            .then(res => {
                return res.data;
            })
            .then(data => {
                if(urlParams.get('recipe')){
                    alert('수정 되었습니다.');
                    location.href = 'mypage.html';
                }else {
                    alert('등록 되었습니다.');
                    location.href = 'home.html';
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
