let layout1 = `
<li>
    <div class="ingre_list_name">
        <a href="javascript:;">#OPTION1</a>
    </div>
    <span class="ingre_list_ea">#OPTION2</span>
</li>
`
let leyout2 = `
<div class="media reply_list">
    <div class="media-left">
        <a href="javascript:;">
            <img class="media-object" src="#PROFILE" data-holder-rendered="true">
        </a>
    </div>
    <div class="media-body">
        <h4 class="media-heading"><b class="info_name_f">#WRITER</b>#DATE
            <span class="reply_list_star">
                #STAR
            </span>
        </h4>
        <p class="reply_list_cont">#CONTENT</p>
    </div>
</div>
`

let layout3 = `
<div class="view_step_cont media step#NUM">
    <div id="stepdescr1" class="media-body">#CONTENT</div>
    <div id="stepimg1" class="media-right">
        <img src="#IMAGE">
    </div>
</div>
`
let starLayout  = '<img src="/img/star.png">'
let nostarLayout = '<img src="/img/empty_star.png">'
let scrapCheck = false;
let score = 0;
document.addEventListener('DOMContentLoaded', ()=>{
    if(!JSON.parse(getCookie('uInfo'))){
        alert('로그인 후 이용해주세요.');
        location.href = 'login.html';
    }
    
    init();
});

async function init() {
    await checkScrap();

    axios.get(`${URL}/recipe/detail/${urlParams.get('recipe')}`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            let levelCase={
                '1':'아무나'
                ,'2':'초급'
                ,'3':'중급'
                ,'4':'고급'
                ,'5':'신의경지'
            }
            
            document.querySelector('#main_thumbs').src = data.image ? IMGURL+data.image: '/img/logo.png';
            document.querySelector('#recipeIntro').textContent = data.summery || '';
            document.querySelector('#main_name').textContent = data.writer || '';
            document.querySelector('#main_profile').src = data.writerImg ? IMGURL + data.writerImg : '/img/profile.png';
            document.querySelector('#main_title').textContent = data.title || '';
            document.querySelector('#main_userCount').textContent = `${data.userCount||'0'}인분`;
            document.querySelector('#main_time').textContent = `${data.time|| ''}분`;
            document.querySelector('#main_level').textContent = levelCase[data.level || ''];

            data.ingredient.split('|').map(d=>{
                let option1 = d.split('^')[0];
                let option2 = d.split('^')[1];
                document.querySelector('#ingredient_area')
                    .insertAdjacentHTML('beforeend',layout1
                        .replace('#OPTION1',option1)
                        .replace('#OPTION2',option2)
                    )
            })
            data.seasoning.split('|').map(d=>{
                let option1 = d.split('^')[0];
                let option2 = d.split('^')[1];
                document.querySelector('#seasoning_area')
                    .insertAdjacentHTML('beforeend',layout1
                        .replace('#OPTION1',option1)
                        .replace('#OPTION2',option2)
                    )
            })

            data.recipe_sort.map(p=>{
                document.querySelector('#step_area')
                    .insertAdjacentHTML('beforeend',layout3
                        .replace('#NUM',p.step)
                        .replace('#CONTENT',p.content)
                        .replace('#IMAGE',p.image ?IMGURL + p.image : '/img/logo.png')) 
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

        axios.get(`${URL}/comments/${urlParams.get('recipe')}`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            data.map(d=>{                
                let star = '';
                for(let i = 1 ; i <= 5 ;i++){
                    if(i <= d.score){
                        star += starLayout
                    }else {
                        star += nostarLayout
                    }
                }

                document.querySelector('#contents_area')
                    .insertAdjacentHTML('beforeend',leyout2
                        .replace('#WRITER',d.user_nm)
                        .replace('#CONTENT',d.comment)
                        .replace('#DATE',d.reg_date.split('T')[0])
                        .replace('#PROFILE', d.user_image ? IMGURL + d.user_image: '/img/profile.png')
                        .replace('#STAR',star)
                    )
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

        let src ='';
        if(scrapCheck){
            src = '/img/scrap.png';
        }else {
            src = '/img/noscrap.png';
        }
        document.querySelector('#scrap_img').src = src;
}

async function checkScrap(){    
    await axios.get(`${URL}/refrigerate/${JSON.parse(getCookie('uInfo')).idx}`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            data.find(d=>{
                if(d.recipe_id == urlParams.get('recipe')){
                    
                    scrapCheck =true;
                }
                return d.recipe_id == urlParams.get('recipe')
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

function insertComment(){
    let data = {
        member_idx: JSON.parse(getCookie('uInfo')).idx
        ,recipe_idx: urlParams.get('recipe')
        ,comment:document.querySelector('#cmt_tx_content1').value
        ,score
    }
    axios.post(`${URL}/comments`,data)
        .then(res => {
            return res.data;
        })
        .then(data => {
            alert('등록되었습니다.')
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

function scrapRecipe(){
    let data = {
        member_id: JSON.parse(getCookie('uInfo')).idx
        ,recipe_id: urlParams.get('recipe')
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
function changeStar(clickedStar){
    var stars = document.querySelectorAll('.reply_list_star input[type="image"]');
    var clickedIndex = Array.from(stars).indexOf(clickedStar) + 1;
    var isStar = clickedStar.src.includes('star.png');
    score = clickedIndex;
    for (var i = 0; i < stars.length; i++) {
        if (i < clickedIndex) {
            stars[i].src = isStar ? '/img/star.png' : '/img/empty_star.png';
        } else {
            stars[i].src = '../img/empty_star.png';
        }
    }
}