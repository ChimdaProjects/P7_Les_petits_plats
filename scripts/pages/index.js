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

/**
 * This function displays the list of ingredients, appliances or ustensils
 * @param {Event} event 
 */
function displayList(event) {
    
    let value = event.target.value;

    switch (value) {
        case "btn-ing":
            inputSelectIng.focus();
            openedListIng = true;
            openedListApp = false;
            openedListUst = false;

            if (openedListIng) {
                menuContainerIng.style.display="block";
                btnAppliance.style.margin = "0 500px";
                btnUstensil.style.margin = "0 500px";
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
                btnUstensil.style.margin = "0 500px";
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
 * This function allows the user to search from the input
 * @param {Event} event 
 */
function displayInputSearch(event) {
    let value = event.target.value;
    switch (value) {
        case "btn-ing" :
            
            menuContainerIng.style.display="block";
            menuContainerIng.classList.remove("format-1");
            menuContainerIng.classList.add("format-2");
            listIng.style.display="none";
            inputSelectIng.focus();
            inputSelectIng.addEventListener("keyup",() => {
                listIng.style.display="block"
                listIng.classList.remove("list-format-1");
                listIng.classList.add("list-format-2");
                
            });
            menuContainerIng.style.display="block";
            btnAppliance.style.margin = "0 50px";
            btnUstensil.style.margin = "0 50px";
            break;

        case "btn-app" :
            menuContainerApp.style.display="block";
            menuContainerApp.classList.remove("format-1");
            menuContainerApp.classList.add("format-2");
            listApp.style.display="none";
            inputSelectIng.focus();
            inputSelectApp.addEventListener("keyup",() => {
                listApp.style.display="block"
                listApp.classList.remove("list-format-1");
                listApp.classList.add("list-format-2");
            });
            menuContainerApp.style.display="block";
            btnUstensil.style.margin = "0 50px";
            break;

        case "btn-ust" :
            menuContainerUst.style.display="block";
            menuContainerUst.classList.remove("format-1");
            menuContainerUst.classList.add("format-2");
    
            inputSelectUst.focus();
            inputSelectUst.addEventListener("keyup",() => {
                listUst.style.display="block";
                listUst.classList.remove("list-format-1");
                listUst.classList.add("list-format-2");
            });
            menuContainerUst.style.display="block";
            break;

        default:
            console.log("une erreur s'est produite.")

    }
   
}
/**
 * This function close the list of the ingredients
 */
function closeList() {
    menuContainerIng.style.display ="";
    menuContainerApp.style.display ="";
    menuContainerUst.style.display ="";
    //on vide la valeur de l'input
    inputSelectIng.value="";
    inputSelectApp.value="";
    inputSelectUst.value="";
    btnAppliance.style.margin="";
    btnUstensil.style.margin="";
   backInitialDisplay();
}

/**
 * This function resets the applied style to the initial
 */
function backInitialDisplay() {
    // ingredients
    menuContainerIng.classList.remove("format-2");
    menuContainerIng.classList.add("format-1");
    listIng.classList.remove("list-format-2");
    listIng.classList.add("list-format-1");
    const eltIng = document.getElementsByClassName("elt-ing");
    
    for( item of eltIng) {
        item.classList.remove("size2");
        item.classList.add("size1");
    }

    // appliances
    menuContainerApp.classList.remove("format-2");
    menuContainerApp.classList.add("format-1");
    listApp.classList.remove("list-format-2");
    listApp.classList.add("list-format-1");
    const eltApp = document.getElementsByClassName("elt-app");

    for( item of eltApp) {
        item.classList.remove("size2");
        item.classList.add("size1");
    }
    //ustensils
    menuContainerUst.classList.remove("format-2");
    menuContainerUst.classList.add("format-1");
    listUst.classList.remove("list-format-2");
    listUst.classList.add("list-format-1");
    const eltUst = document.getElementsByClassName("elt-ust");

    for( item of eltUst){
        item.classList.remove("size2");
        item.classList.add("size1");
    }

}


async function init () {
    await getRecipes();
    displayData(recipesArray);
}


init();




