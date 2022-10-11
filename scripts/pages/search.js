/* MAIN SEARCH BAR */
// variables
/*let recipesResult=[];
let ingredientResult=[];
let applianceResult=[];
let ustensilsResult=[];
let valueSearched;

// DOM elements
const searchBar = document.querySelector("#search-input");
const cardCont = document.querySelector("#list-recipes");
console.log("cardCont", cardCont);

let recipeCard = document.getElementsByClassName("card-recipe");
let recipesCard = cardCont.children;
console.log("recipesCard", recipesCard)

//console.log("recipeCard arr", recipeCard);

// EVENTS
searchBar.addEventListener("keyup", recipesFiltered);

/**
 * Display card of recipes filtered after typing into the search bar
 * @param {Event} event 
 */
/*function recipesFiltered(event) {
    
    valueSearched = event.target.value.toLowerCase();
    let numberOfChar = valueSearched.length;
    card = recipesCard;
    
    if (numberOfChar > 2 ) {
        mainResearch(valueSearched, card); 
    }  else {
        displayData(recipesArray)
    }
}

function mainResearch(valueSearched, recipeCard) {

    recipesResult=[];
    console.log("recipes result 1", recipesResult);
    allListIngredients=[];
    allListAppliances=[];
    allListUstensils=[];
    
        //console.time('main loop');
        for (let i=0; i < recipeCard.length; i++) {
            
            if ( recipeCard[i].textContent.toLowerCase().includes(valueSearched)) {
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i]);
                console.log("recipeResult2", recipesResult)
                
                // liste ingrédients
                let ingr= recipeCard[i].getElementsByClassName("ingr");
                //console.log("ingr", ingr);
                for(let i=0; i < ingr.length; i++) {
                    let ingrText = ingr[i].textContent.toLowerCase();
                    //console.log("text", text);
                    
                    let ingredient = ingrText.split(":")[0];
                    //console.log("textmodified", textModified)
                    allListIngredients.push(ingredient);
                    //console.log("ingredientResult", allListIngredients)
                }
                //liste appareils
                let appl = recipeCard[i].dataset.appliance.toLowerCase();
                allListAppliances.push(appl);
                //console.log("app result", allListAppliances);

                // liste ustensils 
                
                let ust = recipeCard[i].dataset.ustensils.toLowerCase();
                let ustModified = ust.split(",");
                for (let i =0; i < ustModified.length; i ++) {
                    let ustensil = ustModified[i].toLowerCase();
                    allListUstensils.push(ustensil);
                    //console.log("result ustensils", allListUstensils)
                }
                
            } 
            else {
                recipeCard[i].style.display = "none";
            } 
            //console.timeEnd('main loop') 
        }
        console.log("recipes result ext 3", recipesResult)
        
        updateList(allListIngredients, "ing");
        updateList(allListAppliances, "app");
        updateList(allListUstensils, "ust");
       
}
*/
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
    
    const valueSearched = event.target.value.toLowerCase();
    console.log("value input", valueSearched);
    let numberOfChar = valueSearched.length;
    card = recipeCard;
    mainResearch(valueSearched, card)
    if (numberOfChar > 2 ) {
        mainResearch(valueSearched, card); 
    } else {
        recipesArray=[]
        displayData(recipesArray)
    }
  
}

 
function mainResearch(valueSearched, recipeCard) {
    recipesResult=[];
    ingredientResult=[];
    applianceResult=[];
    ustensilsResult=[];
    //console.log("recipeCard", recipeCard)
   
        for (let i=0; i < recipeCard.length; i++) {
            if ( recipeCard[i].textContent.toLowerCase().includes(valueSearched)) {
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i]);

                // liste ingrédients
                let ingr= recipeCard[i].getElementsByClassName("ingr");
                console.log("ingr", ingr);
                for(let i=0; i < ingr.length; i++) {
                    let text = ingr[i].textContent;
                    console.log("text", text);
                    let textModified = text.split(" ");
                    let ingredient = textModified[0].replace(":", "").toLowerCase();
                    ingredientResult.push(ingredient);
                }
                //liste appareils
                let appl = recipeCard[i].dataset.appliance.toLowerCase();
                console.log("appl id", appl);
                applianceResult.push(appl);
                // liste ustensils
                let ust = recipeCard[i].dataset.ustensils.toLowerCase();
                let ustModified = ust.split(",");
                for (let i =0; i < ustModified.length; i ++) {
                    let ustensil = ustModified[i].toLowerCase();
                    ustensilsResult.push(ustensil);
                }
                //console.log("uust", ustModified);
            } 
            else {
                recipeCard[i].style.display = "none";
            } 
            console.timeEnd('main loop') 
        }
        if (recipesResult.length == 0) {
            cardCont.innerHTML = `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc...`
        }
        updateList(ingredientResult, "ing");
        updateList(applianceResult, "app");
        updateList(ustensilsResult, "ust");
        //console.log("result ingredient XXX", ingredientResult);
        console.log("result appareil XXX", applianceResult);
        console.log("result aust XXX", ustensilsResult);

    
}
