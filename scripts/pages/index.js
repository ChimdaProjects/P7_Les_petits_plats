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
            //console.log("recipeArray", recipesArray);
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
        
        updateList(allListIngredients, "ing");
        updateList(allListAppliances, "app");
        updateList(allListUstensils, "ust");
}

/**
 * This function updates the list of each category
 * @param {Array} arr Array of ingredients, appliances or ustensils of json's file or after research
 * @param {String} element - name of the category (ing, app, ust)
 */
function updateList(arr, element) {

    const listContainer = document.querySelector(`.list-${element}`);
    listContainer.innerHTML="";

    // create a new array without duplicates
    let listElts = Array.from([...new Set(arr)]).sort();
    //console.log(`list des éléments ${element}`, listElts);
    listElts.forEach((elt)=> {
        const listModel = recipeFactory(elt, element);
        const listDOM= listModel.getList();    
    });
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
            const menuContainerIng = document.querySelector(".list-ingr");
            menuContainerIng.style.display="block";
            break;

        case "btn-app" :
            const menuContainerApp = document.querySelector(".list-appl");
            menuContainerApp.style.display="block";
            break;

        case "btn-ust" :
            const menuContainerUst = document.querySelector(".list-uste");
            menuContainerUst.style.display="block";
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
    const menuContainer = document.querySelector(".list-ingr");
    menuContainer.style.display ="";

    const menuContainerApp = document.querySelector(".list-appl");
    menuContainerApp.style.display ="";

    const menuContainerUst = document.querySelector(".list-uste");
    menuContainerUst.style.display ="";

}

/**
 * This function displays tag selected by the user for the research
 * @param {Event} event 
 */
function displayTagIng (event, cat) {
   
    const inputMain = document.querySelector("#search-input").value;
    if(!inputMain.length) {
        alert("Veuillez saisir une première recherche!")
    } else {
        let valueTarget = event.target;
        let value = event.target.value.toLowerCase();
        cat = valueTarget.dataset.category;
        
        //insert the value in the array tagSelected
        tagsSelected.push(value);
            
        const tagModel = recipeFactory(value, cat);
        const tagDOM = tagModel.displayTag();
        console.log(`filteredArr au click du tag: ${value}`, filteredArr);
        searchByTag(filteredArr, tagsSelected, cat);
        closeList();
    }
}

console.log("tableau tags selected", tagsSelected);

/**
 * This function delete the tag when the user clicks on the X 
 * @param {Event} e -event
 */
function deleteTag(e, cat) {
    
    let tagDelete = e.target.id;
    cat =  e.target.dataset.category;
   //console.log("tagDelete", tagDelete);
   //console.log("cat", cat);
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

   searchByTagAfterRemove(filteredArr, tagsSelected, cat);
  
}

async function init () {
    await getRecipes();
    displayData(recipesArray);
}

// Close the list when the user clicks outside
//window.addEventListener("mouseup", closeList)
init();




