// Déclaration variables
let recipesArray = [];
let allListIngredients = [];
let listIngredients = [];
let listAppliances = [];
let allListAppliances = [];
let listUstensils = [];
let allListUstensils = [];
let tagsSelected = [];
let openedListIng = false ;
let openedListApp = false  ;
let openedListUst = false  ;
// Elements DOM
const recipeSection = document.querySelector("#list-recipes");
const menuContainerIng = document.querySelector(".list-ingr");
const menuContainerApp = document.querySelector(".list-appl");
const menuContainerUst = document.querySelector(".list-uste");

const inputMain = document.querySelector("#search-input").value;

const listIng = document.querySelector(".list-ing");
const listApp = document.querySelector(".list-app");
const listUst= document.querySelector(".list-ust");

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
   
    listElts.forEach((elt)=> {
        const listModel = recipeFactory(elt, element);
        const listDOM= listModel.getList();    
    });
}
const btnAppliance = document.querySelector("#btn-appareils");
const btnUstensil = document.querySelector("#btn-ustensils");
const iconDownCont = document.querySelector(".icon-down");

//add event to select icon down
const btnOpenList = document.querySelectorAll(".btn-open-list");
btnOpenList.forEach(elt => elt.addEventListener("click", displayList));
/**
 * This function displays the list of ingredients, appliances or ustensils
 * @param {Event} event 
 */
function displayList(event) {

    let btn = event.target.closest(".btn-container");
    let value = btn.dataset.value;
    switch (value) {
        case "btn-ing":
            inputSelectIng.focus();
            openedListIng = true;
            openedListApp = false;
            openedListUst = false;

            if (openedListIng) {
                menuContainerIng.style.display="block";
                menuContainerApp.style.display="none";
                menuContainerUst.style.display="none"; 
            } 
             
            break;

        case "btn-app" :
     
            inputSelectApp.focus();
            openedListApp = true;
            openedListIng = false;
            openedListUst = false;
         
            if (openedListApp) {
                menuContainerApp.style.display="block"
                menuContainerIng.style.display="none";
                menuContainerUst.style.display="none"
            }
            break;

        case "btn-ust" :
            inputSelectUst.focus();
            btnAppliance.style.margin = "";
            openedListIng = false;
            openedListApp = false;
            openedListUst = true;

            if (openedListUst) {
                menuContainerUst.style.display="block";
                menuContainerIng.style.display="none";
                menuContainerApp.style.display="none";
             } 
           
            break;

        default: 
            console.log(`Sorry, we are out of ${value}.`);
    }
   
    
    
}



/**
 * This function displays tag selected by the user for the research
 * @param {Event} event 
 * @param {String} cat - category of the tag (ing, app, ust)
 */
 function displayTagElt (event, cat) {
   
    let valueTarget = event.target;
    let value = event.target.value.toLowerCase();
    cat = valueTarget.dataset.category;
    
    //insert the value in the array tagSelected
    tagsSelected.push(value);
        
    const tagModel = recipeFactory(value, cat);
    const tagDOM = tagModel.displayTag();
   
    if (!valueSearched) {
        if (tagsSelected.length == 1) {
            searchByTag(recipesArray, tagsSelected, cat)
        } else {
            searchByTag(recipesByTag, tagsSelected, cat);
        }        
    } else if (valueSearched) {
        if (tagsSelected.length > 1) {
            searchByTag(recipesByTag, tagsSelected, cat);
        } else {
            searchByTag(filteredArr, tagsSelected, cat);
        }
    }
    closeList();
}

/**
* This function delete the tag when the user clicks on the icon X 
* @param {Event} e -event
* @param {String} cat - category of the tag (ing, app, ust)
*/

function deleteTag(e, cat) {

    let tagDelete = e.target.id;
    cat =  e.target.dataset.category;

    let parent = e.target.parentElement;
    let parent2 = parent.parentNode;

    let tagSelected = tagsSelected.find(elt => 
    { 
        elt.replace(/ /g,"") == tagDelete
    });
    tagsSelected.pop(tagSelected); 
    let section = document.querySelector("#tags-section");
    section.removeChild(parent2);

    if ( !valueSearched) {
  
        if (tagsSelected.length == 0) {
            recipeSection.innerHTML="";
            displayData(recipesArray); 
            let total = recipesArray.length 
            totalRecipes.innerHTML=`${total} recettes`
        } else {
            searchByTag(recipesArray, tagsSelected, cat);
        } 
    } else {
        if ( tagsSelected.length == 0 ) {
            // on vide le dom car le tableau est vide
            recipeSection.innerHTML="";
            // on lance l'affichage des recettes en prenant en paramètre 1er tableau filtré
            displayData(filteredArr);
        } else {
            searchByTag(filteredArr, tagsSelected, cat)
        }
    }
}

/**
 * This function close the list of the ingredients
 */
function closeList() {
    menuContainerIng.style.display ="none";
    menuContainerApp.style.display ="none";
    menuContainerUst.style.display ="none";
    //on vide la valeur de l'input
    inputSelectIng.value="";
    inputSelectApp.value="";
    inputSelectUst.value="";
    btnAppliance.style.margin="";
    btnUstensil.style.margin="";

}


async function init () {
    await getRecipes();
    displayData(recipesArray);
}


init();




