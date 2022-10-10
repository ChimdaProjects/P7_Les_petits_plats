/* MAIN SEARCH BAR */
// variables
let recipesResult=[];
let ingredientResult=[];
let applianceResult=[];
let ustensilsResult=[];
let valueSearched;

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
    
    valueSearched = event.target.value.toLowerCase();
    console.log("value input", valueSearched);
    let numberOfChar = valueSearched.length;
    card = recipeCard;
    
    if (numberOfChar > 2 ) {
  
        mainResearch(valueSearched, card); 
    }  else {
        displayData(recipesArray)
    }
}

function mainResearch(valueSearched, recipeCard) {
    let recipesResult=[];
    let ingredientResult=[];
    let applianceResult=[];
    let ustensilsResult=[];
    
        //console.time('main loop');
        for (let i=0; i < recipeCard.length; i++) {
            
            if ( recipeCard[i].textContent.toLowerCase().includes(valueSearched)) {
                recipeCard[i].style.display = "block"; 
                recipesResult.push(recipeCard[i]);
                console.log("recipeResult", recipesResult)
                /*
                // liste ingrédients
                let ingr= recipeCard[i].getElementsByClassName("ingr");
                console.log("ingr", ingr);
                for(let i=0; i < ingr.length; i++) {
                    let text = ingr[i].textContent.toLowerCase();
                    console.log("text", text);
                    
                    let textModified = text.split(":")[0];
                    console.log("textmodified", textModified)
                    allListIngredients.push(textModified);
                    console.log("ingredientResult", allListIngredients)
                }
                //liste appareils
                let appl = recipeCard[i].dataset.appliance.toLowerCase();
                allListAppliances.push(appl);
                console.log("app result", allListAppliances);
                // liste ustensils 
                
                let ust = recipeCard[i].dataset.ustensils.toLowerCase();
                let ustModified = ust.split(",");
                for (let i =0; i < ustModified.length; i ++) {
                    let ustensil = ustModified[i].toLowerCase();
                    allListUstensils.push(ustensil);
                    console.log("result ustensils", allListUstensils)
                }
                */
            } 
            else {
                recipeCard[i].style.display = "none";
            } 
            //console.timeEnd('main loop') 
        }
        
        updateList(allListIngredients, "ing");
        updateList(allListAppliances, "app");
        updateList(allListUstensils, "ust");
       
}

/*
function displayIngredients(arr) {
    console.log("arr", arr);
    const menuContainer = document.querySelector(".list-ing");
    menuContainer.style.display="flex";
   
    listIngredients = Array.from([...new Set(arr)]);
    console.log("listIngredients", listIngredients);
    listIngredients.forEach((ing)=> {
        const listModel = recipeFactory(ing);
        const listDOM = listModel.getListOfIngredients();   
    })
   
}
function displayAppliances(arr) {
    const menuContainer = document.querySelector(".list-app");
    menuContainer.style.display="flex";
    listAppliances = Array.from([...new Set(arr)]);
    console.log('listAppliance', listAppliances)
    listAppliances.forEach((app)=> {
        const listModel = recipeFactory(app);
        const listDOM = listModel.getListOfAppliances();   
    })
}
function displayUstensils(arr) {
    const menuContainer = document.querySelector(".list-ust");
    menuContainer.style.display="flex";
    
    listUstensils = Array.from([...new Set(arr)]);
    listUstensils.forEach((ust)=> {
        const listModel = recipeFactory(ust);
        const listDOM = listModel.getListOfUstensils();  
       
    }update
}*/