let recipesArray = [];
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
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        
    })
}

async function init () {
    await getRecipes();
    displayData(recipesArray);
}

init();