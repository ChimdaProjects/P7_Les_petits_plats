let recipesArray = [];
let AllListIngredients = [];
let listIngredients = [];
let listAppliances = [];
let listUstensils = [];
const recipeSection = document.querySelector("#list-recipes");

async function getRecipes() {
   
    //fetch data from json file
    await fetch("./data/recipes.json")
        .then(function (res) {
            if(res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            recipesArray = data;
            console.log("recipeArray", recipesArray);
            return recipesArray;
        })
        .catch(function (err) {
            console.log("Erreur : ", err);
        })
}

async function displayData(recipeArray) {
    console.log("display data", recipesArray);
    recipesArray.forEach((recipe) => {
        
        recipe.ingredients.forEach((ing)=> {
            AllListIngredients.push(ing.ingredient.toLowerCase())    
        })
       
        listAppliances.push(recipe.appliance.toLowerCase());
        
        recipe.ustensils.forEach((ust)=> {
            listUstensils.push(ust.toLowerCase());
        })
        

        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        
    })
}

function displayListIngredients () {
    const menuContainer = document.querySelector(".list-ing");
    listIngredients = Array.from([...new Set(AllListIngredients)]);
    listIngredients.forEach((ing)=> {
        const listModel = recipeFactory(ing);
        const listDOM = listModel.getListOfIngredients();
   
})


}




console.log("list ingredients", AllListIngredients);
console.log("list appareils", listAppliances);
console.log("list ustensils", listUstensils)


async function init () {
    await getRecipes();
    displayData(recipesArray);
    displayListIngredients();
}
console.log("The filtered array2 ",listIngredients);
function openSelect() {
    console.log("open select");
}
init();