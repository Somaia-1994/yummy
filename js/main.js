//loading
$(document).ready(function () {
    $('#loading').fadeOut(2000,()=>{
        $("body").css('overflow','visible');
       
    });
});





//--------------------------getmeal

let shoeItem=document.getElementById('demo')

async function getMeal(){
    let response= await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let home= await response.json();
    console.log(home)
    displayMeal(home.meals,0)
    getMealDetail()
}
getMeal()


function displayMeal(meal,mealNo){
    let container=``;
    for(let i=0 ; i<meal.length ; i++ ){
container +=`<div class="col-md-3" id="${meal[i].idMeal}">
        <div class="position-relative img-layer overflow-hidden gy-3 ">
            <img src="${meal[i].strMealThumb}" class="w-100 rounded-2" alt="">
            <div class="layer m-auto text-center position-absolute  d-flex align-items-center text-black flex-column justify-content-around">
                <h3>${meal[i].strMeal}</h3>
            </div>
        </div>
        
    </div>`

demo.innerHTML=container
    }
    

}


//-------detailes

function getMealDetail(){
    document.querySelectorAll('.col-md-3').forEach(item => {
        item.addEventListener('click', event => {
        detalis(item.id);
        $('#loading').fadeIn(50);
        $('#displayDetail').removeClass("nonActive")
        $('#displayDetail').siblings().addClass("nonActive");
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        closeSlide();
        })
      })
    })
}
getMealDetail()
    async function detalis(idValue){
    
        let detali = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
        let deresult= await detali.json();
        displayDetails(deresult); 
        console.log(deresult.meals);
    }
   
    
function displayDetails(dataAPI) {
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (dataAPI.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${dataAPI.meals[0][`strMeasure${i}`]} ${dataAPI.meals[0][`strIngredient${i}`]}</li>`
        }
      
    }
    let tags=dataAPI.meals[0].strTags;
    let tagesword=``;
    if(tags){
        let tagessplit=tags.split(",");
        for(let i=0;i<tagessplit.length;i++){
            tagesword+=`
            <li class="alert alert-danger m-2 p-1">${tagessplit[i]}</li>
            `
        }
    }else{
            tags=[];
    }
    const cartona = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${dataAPI.meals[0].strMealThumb}" alt="image meal">
                        <h2>${dataAPI.meals[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                <h2>Instructions</h2>
                
                <p>${dataAPI.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataAPI.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataAPI.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagesword}
                </ul>
                <a target="_blank" href="${dataAPI.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${dataAPI.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    
    `;
    document.getElementById('mealDetails').innerHTML=cartona;
   
}


//--------- side bar


function openSlide(){
    $('#sideContainer').animate({left:'0px'},1000);
    $('#iconBox').removeClass('fa-bars');
    $('#iconBox').addClass('fa-x');
    
 
}

function closeSlide(){
    let sideBarWidth = $('#sideBox').innerWidth();
    $('#sideContainer').animate({left:-sideBarWidth},1000);
    $('#iconBox').removeClass('fa-x');
    $('#iconBox').addClass('fa-bars');
};


    

$('#iconBox').click(function (e) { 
        if($('#sideContainer').css('left') == '0px'){
            closeSlide();
        }else{
            openSlide();
        }
    });
    closeSlide()
    
    
    // search
    function showSearchInput(){
        $('#searchInput').click(()=>{
           openSearch();
           $('#loading').fadeIn(50);
            $('#loading').fadeOut(1000,()=>{
            $("body").css('overflow','visible');
            getTerm();
            document.getElementById('searchInput').innerHTML='<a href="#searchContainer" target="_blank" id="searchInput">Search</a>'

        });
        let searchContainer = document.getElementById('searchContainer');
        let container =``;
        container +=`<div class="row py-4">
                <div class="col-md-6">
                <input type="text" placeholder="Search By Name" class="search form-control text-white bg-transparent" id="searchName">
                </div>
                <div class="col-md-6">
                <input type="text" maxlength="1" placeholder="Search By First Letter"class="search form-control text-white bg-transparent" id="searchLetter">
                </div>
            </div>` 
            searchContainer.innerHTML = container;
        })
    }
    showSearchInput();
    function openSearch(){
        $(function () {
            closeSlide();
            console.log('hello');
            $('#search').removeClass("nonActive")
            $('#search').siblings().addClass("nonActive");
        });
    }
    async function searchByName(term){
        let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        let finalResult = await apiResponse.json();
        // let meals = finalResult.meals;
        displayMeal(finalResult.meals,1);
        console.log(finalResult.meals);
    }
    async function searchByLetter(letter){
        let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let finalResult = await apiResponse.json();
        displayMeal(finalResult.meals,1);
    }
    function getTerm(){
    $('#searchName').keyup(function (eventInfo) {
        $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000);
        searchByName(eventInfo.target.value);
    });
    
    $('#searchLetter').keyup(function (eventInfo) {
        $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000);
        searchByLetter(eventInfo.target.value);
    });
    }

    // Category
function showCategoryInput(){
    $('#Category').click(()=>{
        opencategory();
       $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        showCategory();
    });
})
}
showCategoryInput();
function opencategory(){
    $(function () {
        closeSlide();
        $('#categoryBox').removeClass("nonActive")
        $('#categoryBox').siblings().addClass("nonActive");
    });
}
async function showCategory(){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalResult = await apiResponse.json();
    displayList(finalResult.categories);
    console.log(finalResult.categories);
    getCategoryType();
    $('#listCategry').removeClass("nonActive")
    $('#listCategry').siblings().addClass("nonActive");
    
}
function displayList(category){
    let container = ``;
    for(let i=0;i<category.length;i++){
       container +=
       `<div class="col-md-3">
       <div class="meal rounded-2" id="meal">
      <img class="w-100" src="${category[i].strCategoryThumb}" alt="">
      <div class="layer position-absolute text-center text-black p-2 d-block" id="layer1">
                        <h3>${category[i].strCategory}</h3>
                        <p>${category[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
   </div>
     </div>` 
    }
   $('#listCategry').html(`${container}`);

    console.log('hello');
}
function getCategoryType(){

document.querySelectorAll('.layer').forEach(item => {
    item.addEventListener('click', event => {
        getType(item.querySelector('h3').textContent);
    })
  })
}

// Area
$('#AreaInput').click(function(){      
    openAria()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(2000, function(){
     $('body').css("overflow", "visible");
     arealist();  
    });
   
   
})                              
function openAria()
{ $(function () {
    closeSlide()
    console.log('hi');
    $("#area").removeClass("nonActive");
    $("#area").siblings().addClass("nonActive");
});
}


async function arealist()
{
    let aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let aresult= await aresponse.json();
    displyAreaList(aresult.meals,aresult.meals.length,1);
    areaName();

}
function areaName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getArea(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
            

        })
    }
}
async function getArea(Areaname){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Areaname}`);
    let arfinalResult = await arResponse.json();
    displayMeal(arfinalResult.meals,3);
    console.log(arfinalResult.meals);
    $('#Areameals').removeClass("nonActive")
    $('#Areameals').siblings().addClass("nonActive");
    getMealDetail();

}
function displyAreaList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val; i++) {
        cartoona += `
        <div class="col-md-3 text-white ">
          <div class="meallist rounded-2 text-center cursor-pointer text-white ">
            <i class="fa-solid fa-house-laptop fa-4x "></i>
                <h3>${arr[i].strArea}</h3>
          </div>
        </div>
        `
    }
       $('.list').eq(num).html(`${cartoona}`);
}
// Ingredients
$('#IngredientsInput').click(function(){      
    openInteg()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(2000, function(){
     $('body').css("overflow", "visible");
     Integlist();  
    });
   
   
})                              
function openInteg()
{ $(function () {
    closeSlide()
    console.log('hi');
    $("#Ingredients").removeClass("nonActive");
    $("#Ingredients").siblings().addClass("nonActive");
});
}


async function Integlist()
{
    let aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let aresult= await aresponse.json();
    displyIntegList(aresult.meals,aresult.meals.length,2);
    integName();

}
function integName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getInteg(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
            

        })
    }
}
async function getInteg(IntegName){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IntegName}`);
    let arfinalResult = await arResponse.json();
    displayMeal(arfinalResult.meals,4);
    console.log(arfinalResult.meals);
    $('#IntergatesMeals').removeClass("nonActive")
    $('#IntergatesMeals').siblings().addClass("nonActive");
    getMealDetail();

}
function displyIntegList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val && i<20; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2 text-center cursor-pointer text-white  ">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${arr[i].strIngredient}</h3>
          <p>${`${arr[i].strDescription}`.split(" ").slice(0,20).join(" ")}</p>
          
          </div>
        </div>
        `
    }
       $('.list').eq(num).html(`${cartoona}`);
}
//-----contact
let signUpName= document.getElementById('signName')
let signUpEmail=document.getElementById('signEmail')
let signUpPassword=document.getElementById('signPassword')

let signUpNumber=document.getElementById('signNumber')
let signUpAge=document.getElementById('signAge')

let user=[]

if(localStorage.getItem('user')!= null){
    user = json.parse(localStorage.getItem('user'))
}else
{
    user=[]
}


function add(){
    if(signUpName.value == '' || signUpEmail.value =='' || signUpPassword.value== '')
    {
        alert('please rgestier first')
    }else{
        let obj={
            name:signUpName.value,
            email:signUpEmail.value,
            password:signUpPassword.value
        }
        user.push(obj);
        
        document.getElementById('message').innerHTML='<p class = "text-success fs-1"> success </p>  '
        localStorage.setItem('user', JSON.stringify(user))
        location.href='./form.html'
         
       
     

    }
}

