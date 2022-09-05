/* MAIN SEARCH BAR */
// variables
let recipesResult=[];




// DOM elements
const searchBar = document.querySelector("#search-input");
const recipeCard = document.getElementsByClassName("card-recipe");

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
    
    //console.log("value length", numberOfChar);
    if (numberOfChar > 2 ) {
       
        for (let i=0; i < recipeCard.length; i++) {
            if ( recipeCard[i].textContent.toLocaleLowerCase().includes(valueSearched)) {
                console.log("recipeCard ds for", recipeCard[i]);
                //console.log("id", recipeCard[i].id);
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i])
                
            } else {
                recipeCard[i].style.display = "none";
            }
            
        }  
    
    }      

} 

//let resultMain = [...new Set(recipesResult)];

//console.log("card", recipeCard);

/*
for( let i=0; i < recipesResult.length; i++) {
    if(recipesResult[i].id) {
        recipesResult.pop(recipesResult[i]);
    }
}*/
console.log("result", recipesResult);