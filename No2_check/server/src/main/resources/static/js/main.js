let layout1 = `
<span data-value="#VAL">
    #VALUE <a class="glyphicon glyphicon-remove" onclick="removeCate(this)"></a>
</span>
`
let layout2 = `
<div class="panel-body" style="width: 32%;">
    <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <a href="detail.html?recipe=#RECIPEID"> 
                <h3 style="margin: 0;">#TITLE</h3>
            </a>
            <img src="/img/#IMG.png" alt="noscrap" style="width: 20px; height: 20px;">
        </div>
        <span class="txt"><p style="color:#FF0000;">#SELIND개 재료 보유</p>/ 총 #ALLIND개</span>
        <br>
        <span class="txt">보유재료 :<p>#SELITEM</p></span>
        <span style="display: inline-block; text-align: left;">
            없는재료 : <span style="margin-right: 5px;"></span><p style="color:#ccc; margin: 0; display: inline;">#DONIND</p>
        </span>                                       
    </div>
</div>
`
let listRecipe = [];
let scrapList = '';
let selCate = [];

document.addEventListener('DOMContentLoaded', ()=>{
    if(!JSON.parse(getCookie('uInfo'))){
        alert('로그인 후 이용해주세요.');
        location.href = 'login.html';
    }    
    init();
});

function init(){
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
    
}
function addCate(){
    let val = document.querySelector('#inp_cate').value;
    let area = document.querySelector('#cateArea');
    
    area.insertAdjacentHTML('beforeend',layout1.replace('#VALUE',val).replace('#VAL',val))
}

function removeCate(e){
    e.closest('span').remove();
}

function showList(){
    let selList = []
    document.querySelectorAll('#cateArea span').forEach((d, id)=>{
        selList.push(d.getAttribute('data-value'));
    })
    let area = document.querySelector('#reciList');
    area.innerHTML = "";
    listRecipe
        .filter(p=>
            selList.find(z=>p.ingredient.indexOf(z) > -1 || p.seasoning.indexOf(z) > -1)
        ).map(p=>{
            let inde = [];
            let doninde =[];
            let useinde =[];
            p.ingredient.split('|')
                .concat(p.seasoning.split('|'))
                .map(d=>{
                inde.push(d.split('^')[0]);
                if(selList.indexOf(d.split('^')[0])==-1){
                    doninde.push(d.split('^')[0]);
                }else {
                    useinde.push(d.split('^')[0])
                }
            })
            
            area.insertAdjacentHTML('beforeend',layout2
                .replace('#TITLE',p.title)
                .replace('#SELIND',useinde.length)
                .replace('#RECIPEID',p.recipe_id)
                .replace('#SELITEM',useinde.join(', '))
                .replace('#ALLIND',inde.length)
                .replace('#DONIND',doninde.join(', '))
                .replace('#IMG', scrapList.indexOf(p.recipe_id) > -1? 'scrap':'noscrap'))
        })

}