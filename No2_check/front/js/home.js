let listLayout = '';
let listArea = '';
let listRecipe = [];
let starLayout = '<img src="/img/star.png">';
let nostarLayout = '<img src="/img/empty_star.png">'
document.addEventListener('DOMContentLoaded', ()=>{
    init();
});

function init(){
    listArea = document.querySelector('#ListArea');
    listLayout = document.querySelector('.common_sp_list_li').outerHTML;
    listArea.innerHTML = "";

    axios.get(`${URL}/recipe/0`)
        .then(res => {
            return res.data;
        })
        .then(data => {
            listRecipe = data;

            binding();
            
            document.querySelectorAll('.rcp_cate a').forEach(e=>{
                e.addEventListener('click',()=>{
                    e.closest('.cate_list').querySelector('.active').classList.remove('active');
                    e.classList.toggle('active')
                    binding();
                })
            })

            document.querySelectorAll('#sort_option li').forEach(e=>{
                e.addEventListener('click',()=>{
                    e.closest('#sort_option').querySelector('.active').classList.remove('active');
                    e.classList.toggle('active')
                    binding();
                })
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

function binding(){
    const cate1 = document.querySelector('#cate1 .active').textContent.split('/')
    const cate2 = document.querySelector('#cate2 .active').textContent.split('/')
    const cate3 = document.querySelector('#cate3 .active').textContent.split('/')
    const cate4 = document.querySelector('#cate4 .active').textContent.split('/')
    const sort_option = document.querySelector('#sort_option .active').textContent
    const searchValue = document.querySelector('#srhRecipeText').value;
    listArea.innerHTML = "";
    listRecipe
        .filter(p=>
            cate1.find(o=>p.summery.indexOf(o) > -1 || o == '전체')
            && cate2.find(o=>p.summery.indexOf(o) > -1 || o == '전체')
            && cate3.find(o=>p.ingredient.indexOf(o) > -1 || o == '전체')
            && cate4.find(o=>p.summery.indexOf(o) > -1 || o == '전체')
            && (p.summery.indexOf(searchValue) > -1 || searchValue == '')
            && p.visible == 'Y'
        )
        .sort((o1,o2)=>{
            let count1 = 0;
            let count2 = 0;
            if(sort_option == '정확순'){
                cate1.forEach(o=>{
                    count1 += o1.summery.indexOf(o) > -1 && 1
                    count2 += o2.summery.indexOf(o) > -1 && 1
                })
                cate2.forEach(o=>{
                    count1 += o1.summery.indexOf(o) > -1 && 1
                    count2 += o2.summery.indexOf(o) > -1 && 1
                })
                cate3.forEach(o=>{
                    count1 += o1.ingredient.indexOf(o) > -1 && 1
                    count2 += o2.ingredient.indexOf(o) > -1 && 1
                })
                cate4.forEach(o=>{
                    count1 += o1.summery.indexOf(o) > -1 && 1
                    count2 += o2.summery.indexOf(o) > -1 && 1
                })
            }else if(sort_option == '추천순'){
                count1 = o1.score;
                count2 = o2.score;
            }else if(sort_option =='최신순'){
                count1 = new Date(o1.regdate);
                count2 = new Date(o2.regdate);
            }
            return count2 - count1;
        })
        .map(p=>{
            let star = '';
            for(let i = 1 ; i <= 5 ;i++){
                if(i <= p.score){
                    star += starLayout
                }else {
                    star += nostarLayout
                }
            }
            listArea.innerHTML += listLayout
                    .replace('#RECIPE_IDX',p.recipe_id)
                    .replace('#TITLE',p.title)
                    .replace('#WRITER',p.writer)
                    .replace('#SCORE',p.score)
                    .replace('#IMAGE',IMGURL+p.image)
                    .replace('#STAR',star)
        })

}
