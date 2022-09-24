// Déclaration variables
let recipesArray = [];
let allListIngredients = [];
let listIngredients = [];
let listAppliances = [];
let allListAppliances = [];
let listUstensils = [];
let allListUstensils = [];
let tagsSelected = [];

// Elements DOM
const recipeSection = document.querySelector("#list-recipes");

/**
 * This function fetch all recipes from json's file
 */
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

/**
 * This function displays the card of each recipe
 * @param {Array} recipeArray array of recipes
 */
async function displayData(recipesArr) {
    allListAppliances= [];
    allListIngredients=[];
    allListUstensils=[];
    //console.log("display data", recipeArray);
    recipesArr.forEach((recipe) => {
        
        recipe.ingredients.forEach((ing)=> {
            allListIngredients.push(ing.ingredient.toLowerCase())    
        })
       
        allListAppliances.push(recipe.appliance.toLowerCase());
        
        recipe.ustensils.forEach((ust)=> {
            allListUstensils.push(ust.toLowerCase());
        })
        

        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        
    })
        console.log(
            "--- liste ingredient dans display data ---", allListIngredients);

        updateList(allListIngredients, "ing");
        updateList(allListAppliances, "app");
        updateList(allListUstensils, "ust");
}

/**
 * 
 * @param {Array} arr Array of ingredients, appliances or ustensils of json's file or after research
 * @param {String} element - name of the category (ing, app, ust)
 */
function updateList(arr, element) {
    const menuContainer = document.querySelector(`.list-${element}`);
    menuContainer.style.display="none";
    console.log("je suis dans update list ing")
    // create a new array without duplicates
    let listElts = Array.from([...new Set(arr)]).sort();
    console.log('list des éléments', listElts);
    listElts.forEach((elt)=> {
        const listModel = recipeFactory(elt, element);
        const listDOM = listModel.getList();   
    })
}

/**
 * This function displays the list of ingredients
 * @param {Array} arr - Array of ingredients of json's file or after research
 */
/*
function updateListIngredients (arr) {
    const menuContainer = document.querySelector(".list-ing");
    menuContainer.style.display="none";
    console.log("je suis dans update list ing")
    let elt = "ing";
    // create a new array without duplicates
    let listIngredients = Array.from([...new Set(arr)]).sort();
    console.log('listIngredients', listIngredients);
    listIngredients.forEach((ingr)=> {
        const listModel = recipeFactory(ingr, elt);
        const listDOM = listModel.getList();   
    })
}

/**
 * This function updates list of appliances
 * @param {Array} arr - array of appliances of json's file or after research
 */
/*
function updateListAppliances (arr) {
    const menuContainer = document.querySelector(".list-app");
    menuContainer.style.display="none";
    listAppliances = Array.from([...new Set(arr)]).sort();
    console.log('listAppliance', listAppliances);
    let elt = "app";
    listAppliances.forEach((appl)=> {
        const listModel = recipeFactory(appl, elt);
        
        const listDOM = listModel.getList();   
    })
}
//console.log('listAppliance2', listAppliances);

/**
 * This function updates list of ustensils
 * @param {Array} arr - array of ustensils of json's file or after research
 */
/*
function updateListUstensils (arr) {
    const menuContainer = document.querySelector(".list-ust");
    menuContainer.style.display="none";
    let elt = "ust";
    listUstensils = Array.from([...new Set(arr)]).sort();
    listUstensils.forEach((uste)=> {
        const listModel = recipeFactory(uste, elt);
        const listDOM = listModel.getList();  
       
    })
}

/**
 * This function displays the list of ingredients, appliances or ustensils
 * @param {Event} event 
 */
function displayList(event) {
    let value = event.target.value;
    //console.log('value', value);
    switch (value) {
        case "btn-ing" :
            const menuContainerIng = document.querySelector(".list-ing");
            menuContainerIng.style.display="flex";
            break;
        case "btn-app" :
            const menuContainerApp = document.querySelector(".list-app");
            menuContainerApp.style.display="flex";
            break;
        case "btn-ust" :
            const menuContainerUst = document.querySelector(".list-ust");
            menuContainerUst.style.display="flex";
            break;
        default: 
            console.log(`Sorry, we are out of ${value}.`);
    }
}


/**
 * This function close the list of the ingredients
 */
function closeList() {
    //console.log("jai le focus out !")
    const menuContainer = document.querySelector(".list-ing");
    menuContainer.style.display ="";

    const menuContainerApp = document.querySelector(".list-app");
    menuContainerApp.style.display ="";

    const menuContainerUst = document.querySelector(".list-ust");
    menuContainerUst.style.display ="";

}


/**
 * This function displays tag selected by the user for the research
 * @param {Event} event 
 */
function displayTagIng (event) {
    
    let value = event.target.value;
   
    tagsSelected.push(value);
   
    //console.log("value tag selectionné", value);
    const tagModel = recipeFactory(value);
    const tagDOM = tagModel.displayTag();
}

/**
 * This function delete the tag when the user clicks on the X 
 * @param {Event} e -event
 */
function deleteTag(e) {
   let tagDelete = e.target.id;
   //console.log("tagDelete", tagDelete);
   let parent = e.target.parentElement;
   let parent2 = parent.parentNode;
   //console.log("parent", parent);
   //console.log("parent2", parent2);
    
   let tagSelected = tagsSelected.find(elt => 
    { console.log("elt", elt)
        elt.replace(/ /g,"") == tagDelete
    });
    tagsSelected.pop(tagSelected); 
    // delete tag selected
   let section = document.querySelector("#tags-section");
   section.removeChild(parent2);
}

async function init () {
    await getRecipes();
    displayData(recipesArray);
}

// Close the list when the user clicks outside
//window.addEventListener("mouseup", closeList)
init();