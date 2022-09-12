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
}


/**
 * This function displays the list of ingredients
 */
function displayListIngredients () {
    const menuContainer = document.querySelector(".list-ing");
    menuContainer.style.display="flex";
    
    listIngredients = Array.from([...new Set(allListIngredients)]);
    listIngredients.forEach((ing)=> {
        const listModel = recipeFactory(ing);
        const listDOM = listModel.getListOfIngredients();   
    })
}

function displayListAppliances () {
    const menuContainer = document.querySelector(".list-app");
    menuContainer.style.display="flex";
    listAppliances = Array.from([...new Set(allListAppliances)]);
    console.log('listAppliance', listAppliances)
    listAppliances.forEach((app)=> {
        const listModel = recipeFactory(app);
        const listDOM = listModel.getListOfAppliances();   
    })
}
//console.log('listAppliance2', listAppliances);

function displayListUstensils ( ) {
    const menuContainer = document.querySelector(".list-ust");
    menuContainer.style.display="flex";
    
    listUstensils = Array.from([...new Set(allListUstensils)]);
    listUstensils.forEach((ust)=> {
        const listModel = recipeFactory(ust);
        const listDOM = listModel.getListOfUstensils();  
       
    })
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


//console.log("tags array", tagsSelected)


//console.log("list ingredients", allListIngredients);
//console.log("list appareils", allListAppliances);
//console.log("list ustensils", allListUstensils)


async function init () {
    await getRecipes();
    displayData(recipesArray);
}

// Close the list when the user clicks outside
//window.addEventListener("mouseup", closeList)
init();