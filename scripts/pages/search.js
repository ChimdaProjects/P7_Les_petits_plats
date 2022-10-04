// Globals variables
let valueSearched;
let filteredArr;


// DOM elements
let searchBarInput = document.getElementById("search-input");
//console.log("value input", searchBarInput);

// Events
searchBarInput.addEventListener("keyup", searchBar);

/**
 * This function 
 * @param {Event} e - event of input
 */
function searchBar(e) {
    valueSearched = (e.target.value).toLowerCase();
    let nbCharValue = valueSearched.length;
    //console.log("value", valueSearched);
    //console.log("length value", valueSearched.length)
    if (nbCharValue > 2) {
        mainSearch(valueSearched, recipesArray);
        searchBarInput.setAttribute("data-error-visible", "false");
       
    } else if (nbCharValue > 1 && nbCharValue <= 2 ) {
        
        searchBarInput.setAttribute("data-error-visible", "true");

    } else if (nbCharValue < 1) {
        let cardsSection = document.querySelector("#list-recipes");
        cardsSection.innerHTML="";
        displayData(recipesArray);
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
            //console.log(`valueFiltered mainSearch`, valueFiltered)
            return valueFiltered;
        });
   
    console.log(`resultat filtré avec la value: ${value}`, filteredArr);
   // on vide le DOM pour chaque modification
   // let cardsSection = document.querySelector("#list-recipes");
    recipeSection.innerHTML="";
    listIng.innerHTML="";
    listApp.innerHTML="";
    listUst.innerHTML="";
     //console.log("tab filtré", filteredArr);
    // si le tableau est vide alors on affiche le msg d'erreur
    if (filteredArr.length == 0) {
        recipeSection.innerHTML = 
        `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes",
        "poisson", etc...`
    //sinon on affiche le resultat obtenu dans le tableau filteredArr
    } else {
        displayData(filteredArr);
    }
    

}



