let searchBarInput = document.getElementById("search-input");
//console.log("value input", searchBarInput);
let valueSearched;
let filteredArr;
searchBarInput.addEventListener("keyup", searchBar);

function searchBar(e) {
    valueSearched = (e.target.value).toLowerCase();
    console.log("value", valueSearched);
    if (valueSearched.length > 2) {
        mainSearch(valueSearched, recipesArray);
       
    } 
    
}

function mainSearch(value, arr) {
    
    filteredArr = arr.filter((el)=> {
        // filtre sur le nom de la recette, description ou ingredients
        let valueFiltered = 
            el.name.toLowerCase().includes(value) || 
            el.description.toLowerCase().includes(value) || 
            el.ingredients.forEach(element => {
            let ingr = element.ingredient.toLowerCase().includes(value);
            //console.log("ingr", ingr);
        });  
        return valueFiltered;
    });
    //console.log("tab filtré", filteredArr);
   
    let cardsSection = document.querySelector("#list-recipes");
    cardsSection.innerHTML="";
    
    displayDataCard(filteredArr);

}

function displayDataCard(arr) {

    allListAppliances= [];
    allListIngredients=[];
    allListUstensils=[];
    //console.log("array display card", arr);
    arr.forEach((recipe) => {
        //console.log("recipe", recipe)
        //console.log("recipe ing", recipe.ingredients)
        recipe.ingredients.forEach((ing)=> {
            allListIngredients.push(ing.ingredient.toLowerCase())    
        })
       
        allListAppliances.push(recipe.appliance.toLowerCase());
        
        recipe.ustensils.forEach((ust)=> {
            allListUstensils.push(ust.toLowerCase());
        })
        
        console.log("recipe", recipe);
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        // on vide le DOM pour à chaque modification
        let listIng = document.querySelector(".list-ing");
        listIng.innerHTML="";
        let listApp = document.querySelector(".list-app");
        listApp.innerHTML="";
        let listUst= document.querySelector(".list-ust");
        listUst.innerHTML="";
        //update lists of ingredients, appliances and ustensils
        updateListIngredients(allListIngredients);
        updateListAppliances(allListAppliances);
        updateListUstensils(allListUstensils);

    })

    
}
/**
 * This function update the list of ingredients
 * @param {Array} arr - Array of ingredients
 */
 function updateListIngredients (arr) {
    const menuContainer = document.querySelector(".list-ing");
    menuContainer.style.display="none";
    
    let listIngredients = Array.from([...new Set(arr)]);
    //console.log('listIngredients', listIngredients);
    listIngredients.forEach((ing)=> {
        const listModel = recipeFactory(ing);
        const listDOM = listModel.getListOfIngredients();   
    })
}
/**
 * This function updates list of appliances
 * @param {Array} arr - Array of appliances
 */
function updateListAppliances (arr) {
    const menuContainer = document.querySelector(".list-app");
    menuContainer.style.display="none";
    let listAppliances = Array.from([...new Set(arr)]);
    //console.log('listAppliance', listAppliances)
    listAppliances.forEach((app)=> {
        const listModel = recipeFactory(app);
        const listDOM = listModel.getListOfAppliances();   
    })
}

/**
 * This function updates list of ustensils
 * @param {Array} arr - array of ustensils 
 */
function updateListUstensils (arr) {
    const menuContainer = document.querySelector(".list-ust");
    menuContainer.style.display="none";
    
    let listUstensils = Array.from([...new Set(arr)]);
    //console.log("listUstensils", listUstensils);
    listUstensils.forEach((ust)=> {
        const listModel = recipeFactory(ust);
        const listDOM = listModel.getListOfUstensils();  
       
    })
}


