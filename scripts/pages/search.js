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
    console.log("length value", valueSearched.length)
    if (nbCharValue > 2) {
        mainSearch(valueSearched, recipesArray);
       
    } //else if (valueSearched.length <= 2 || valueSearched.length > 1 ) {
        
        //let contInput = document.querySelector("#search-bar");
        //contInput.setAttribute("data-error-visible", "true");

     else if (nbCharValue < 1) {
        let cardsSection = document.querySelector("#list-recipes");
        cardsSection.innerHTML="";
        displayData(recipesArray);
    }
}

function mainSearch(value, arr) {
    console.time("main function");
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
    let cardsSection = document.querySelector("#list-recipes");
    cardsSection.innerHTML="";
    let listIng = document.querySelector(".list-ing");
    listIng.innerHTML="";
    let listApp = document.querySelector(".list-app");
    listApp.innerHTML="";
    let listUst= document.querySelector(".list-ust");
    listUst.innerHTML="";
     //console.log("tab filtré", filteredArr);
    // si le tableau est vide alors on affiche le msg d'erreur
    if (filteredArr.length == 0) {
        cardsSection.innerHTML = 
        `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes",
        "poisson", etc...`
    //sinon on affiche le resultat obtenu dans le tableau filteredArr
    } else {
        displayData(filteredArr);
    }
    

}
