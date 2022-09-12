/* MAIN SEARCH BAR */
// variables
let recipesResult=[];
let ingredientResult=[];
let applianceResult=[];
let ustensilsResult=[];

// DOM elements
const searchBar = document.querySelector("#search-input");
const cardCont = document.querySelector("#list-recipes");
console.log("cardCont", cardCont);

let recipeCard = document.getElementsByClassName("card-recipe");

console.log("recipeCard arr", recipeCard);

// EVENTS
searchBar.addEventListener("keyup", recipesFiltered);

/**
 * Display card of recipes filtered after typing into the search bar
 * @param {Event} event 
 */
function recipesFiltered(event) {
    
    const valueSearched = event.target.value;
    console.log("value input", valueSearched);
    let numberOfChar = valueSearched.length;
    card = recipeCard;
    
    if (numberOfChar > 2 ) {
  
        mainResearch(valueSearched, card);
        //console.log("array", recipeCard);
        
    }  
}

function mainResearch(valueSearched, recipeCard) {
    recipesResult=[];
    ingredientResult=[];
    //console.log("recipeCard", recipeCard)
        for (let i=0; i < recipeCard.length; i++) {
            if ( recipeCard[i].textContent.toLowerCase().includes(valueSearched)) {
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i]);
                // liste ingrédients
                let ingr= recipeCard[i].getElementsByClassName("ingr");
                for(let i=0; i < ingr.length; i++) {
                    let tt = ingr[i].textContexent;
                    let textModified = text.split(" ");
                    let ingredient = textModified[0].replace(":", "").toLowerCase();
                    ingredientResult.push(ingredient);
                }
                //liste appareils
                let app = recipeCard[i].getElementsByClassName
            } else {
                recipeCard[i].style.display = "none";
            } 
        }
        displayIngredients(ingredientResult);
        //console.log("result ingredient XXX", ingredientResult);
       
}


function displayIngredients(arr) {
    console.log("arr", arr);
    const menuContainer = document.querySelector(".list-ing");
    menuContainer.style.display="flex";
   
    listIngredients = Array.from([...new Set(arr)]);
    console.log("listIngre", listIngredients);
    listIngredients.forEach((ing)=> {
        const listModel = recipeFactory(ing);
        const listDOM = listModel.getListOfIngredients();   
    })
   
}

function displayAppliances() {

}

function displayUstensils() {

}
