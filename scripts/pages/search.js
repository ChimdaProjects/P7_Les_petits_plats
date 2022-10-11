// variables
let recipesResult=[];
let ingredientResult=[];
let applianceResult=[];
let ustensilsResult=[];
let valueSearched;
let recipesCardFiltered = [];

// DOM elements
const searchBar = document.querySelector("#search-input");
const cardCont = document.querySelector("#list-recipes");
let recipeCard = cardCont.children;

// EVENTS
searchBar.addEventListener("keyup", recipesFiltered);

/**
 * Display card of recipes filtered after typing into the search bar
 * @param {Event} event 
 */
function recipesFiltered(event) {
    
    valueSearched = event.target.value.toLowerCase();
    let numberOfChar = valueSearched.length;
    card = recipeCard;
    
    mainResearch(valueSearched, card)
    if (numberOfChar > 2 ) {
        mainResearch(valueSearched, card); 
    } else if (numberOfChar < 3) {
        cardCont.innerHTML="";
        displayData(recipesArray);
    }
}

/**
 * This function executes the research
 * @param {String} valueSearched the value from input search
 * @param {} recipeCard HTML collection of recipes
 */
function mainResearch(valueSearched, recipeCard) {
    recipesResult=[];
    allListIngredients=[];
    allListAppliances=[];
    allListUstensils=[];
    recipesCardFiltered=[]
   
        for (let i=0; i < recipeCard.length; i++) {
            if ( recipeCard[i].textContent.toLowerCase().includes(valueSearched)) {
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i]);

                // liste ingrédients
                let ingr= recipeCard[i].getElementsByClassName("ingr");
                for(let i=0; i < ingr.length; i++) {
                    let ingrText = ingr[i].textContent.toLowerCase();
                    let ingredient = ingrText.split(":")[0];
                    allListIngredients.push(ingredient);
                }

                //liste appareils
                let appl = recipeCard[i].dataset.appliance.toLowerCase();
                allListAppliances.push(appl);

                // liste ustensils
                let ust = recipeCard[i].dataset.ustensils.toLowerCase();
                let ustModified = ust.split(",");
                for (let i =0; i < ustModified.length; i ++) {
                    let ustensil = ustModified[i].toLowerCase();
                    allListUstensils.push(ustensil);
                }
            } 
            else {
                recipeCard[i].style.display = "none";
            }     
        }

        for ( let recipe of recipesResult) {
            let idCard = recipe.dataset["id"];
            recipesArray.find(elt => {
                if (elt.id == idCard){
                    recipesCardFiltered.push(elt)  
            }})
        }
                
        if (recipesResult.length == 0) {
            cardCont.innerHTML = `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc...`
        }

        updateList(allListIngredients, "ing");
        updateList(allListAppliances, "app");
        updateList(allListUstensils, "ust"); 
}

