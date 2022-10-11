// Globals variables
let valueSearched;
let filteredArr;


// DOM elements
let searchBarInput = document.getElementById("search-input");

// Events
searchBarInput.addEventListener("keyup", searchBar);

/**
 * This function checks if there is 3 characters in the input to launch the search
 * @param {Event} e - event of input
 */
function searchBar(e) {
    valueSearched = (e.target.value).toLowerCase();
    let nbCharValue = valueSearched.length;
  
    if (nbCharValue > 2) {
        mainSearch(valueSearched, recipesArray);
    } else if (nbCharValue < 3) {
        let cardsSection = document.querySelector("#list-recipes");
        cardsSection.innerHTML="";
        displayData(recipesArray);
    } 
}

/**
 * This function executes the main search when the user writes sthg in the input
 * @param {String} value - value from the input
 * @param {Array} arr - array of recipes
 */
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
console.timeEnd("main function")
   // on vide le DOM pour chaque modification
    recipeSection.innerHTML="";
    listIng.innerHTML="";
    listApp.innerHTML="";
    listUst.innerHTML="";
 
    // si le tableau filtré est vide alors on affiche le msg d'erreur
    if (filteredArr.length == 0) {
        recipeSection.innerHTML = 
        `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes",
        "poisson", etc...`
    //sinon on affiche le resultat obtenu dans le tableau filteredArr
    } else {
        displayData(filteredArr);
    }
}



