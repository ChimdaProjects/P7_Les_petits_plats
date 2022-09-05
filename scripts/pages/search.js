/* MAIN SEARCH BAR */
// variables
/*let recipesResult=[];


// DOM elements
const searchBar = document.querySelector("#search-input");
const cardCont = document.querySelector("#list-recipes");
//console.log("cardCont", cardCont);
let recipeCard = cardCont.querySelectorAll(".card-recipe");

console.log("recipeCard1", recipeCard);

// EVENTS
searchBar.addEventListener("keyup", recipesFiltered);

/**
 * Display card of recipes filtered after typing into the search bar
 * @param {Event} event 
 */
/*function recipesFiltered(event) {
    
    const valueSearched = event.target.value;
    console.log("value input", valueSearched);
    let numberOfChar = valueSearched.length;

    if (numberOfChar > 2 ) {
       
        mainResearch(valueSearched, recipeCard);
        console.log("array", recipeCard);
        
    }  
}

function mainResearch(valueSearched, recipeCard) {
    recipesResult=[];
        for (let i=0; i < recipeCard.length; i++) {
            if ( recipeCard[i].textContent.toLocaleLowerCase().includes(valueSearched)) {
                console.log("recipeCard ds for", recipeCard[i].name);
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i]);
               console.log("element trouvé");
             
            } else {
                recipeCard[i].style.display = "none";
            }   
        console.log("result array", recipesResult);
        } 
}

/*function displayIngredients(valueSearched, recipesResult) {
    for (let i=0 ; i < recipesResult.length; i++) {
        if(recipesResult[i].toLocaleLowerCase().includes(valueSearched)) {

        }

    }
    openMenu(recipesResult);
}

function displayAppliances (valueSearched, recipesResult) {

}

function displayUstensils(valueSearched, recipesResult) {

}

function openMenu(recipesResult) {
    recipesResult.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeByTag = recipeModel.getListByTags();
        
    })

  

}

function openSearchBarByTags(e) {
    const inputIngredient = document.querySelector("#myInput-ing");
    inputIngredient.classList.toggle("hidden");
}*/
//console.log("recipeCard2", recipeCard);
