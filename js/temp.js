// www.themealdb.com/api/json/v1/1/filter.php?c=Seafood by cat
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772 by id

// main search fields
let search_flield = document.querySelector('.search_feld');
let search_ic = document.querySelector('.search_ic i');

// meal page
let meal_page = document.querySelector('.meal');
let recipe_details = document.querySelector('.recipe-details');



// Recipes
search_ic.addEventListener('click', getRecipes);
meal_page.addEventListener('click', displaydetails);
recipe_details.addEventListener('click', removeSection);
function getRecipes(){
    let Term = search_flield.value; 
    let Api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Term}`;
    fetch(Api)
    .then((res)=>{
        if(res.ok) return res.json();
    })
    .then((data)=>{
        displayRecipe(data);
        
    });
}

function displayRecipe(data){
    meal_page.innerHTML = '';
    
    if(data.meals == null){
        meal_page.innerHTML = 'No data to provide';
        return;
    }

    data.meals.forEach((rec)=>{
        meal_page.innerHTML += `
        <div class="box">
            <div class="box-img">
                <img src="${rec.strMealThumb}" alt="">
            </div>
            <div class="box-text">
                <h2>${rec.strMeal}</h2>
                <a class="recipe-btn" href="#" data-id="${rec.idMeal}">Get Recipe</a>
            </div> 
       </div>
        
        `
    });
}

function displaydetails(e){
   if(e.target.classList.contains('recipe-btn')){
    let id = e.target.getAttribute('data-id');
    let api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    fetch(api)
    .then((res)=>{
        if(res.ok) return res.json();
    })
    .then((data)=>{
        displayRecipeDetails(data);
        
    });
   }

}
function displayRecipeDetails(data){
console.log(data);
let item = data.meals[0];
recipe_details.innerHTML = "";
recipe_details.style.display = "block";
recipe_details.innerHTML = `
<i class="uil uil-times-circle close"></i>
<h2>${item.strMeal}</h2>
<p>instructions : </p>
<p>${item.strInstructions}</p>
<a href="${item.strYoutube}" target="_blank">watch video</a>
`;

}
function removeSection(e){
   if(e.target.classList.contains('close')){
    e.target.parentElement.style.display = "none";
   }

}