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
    
    const valueSearched = event.target.value.toLowerCase();
    console.log("value input", valueSearched);
    let numberOfChar = valueSearched.length;
    card = recipeCard;
    
    if (numberOfChar > 2 ) {
  
        mainResearch(valueSearched, card); 
    }  
}

function mainResearch(valueSearched, recipeCard) {
    recipesResult=[];
    ingredientResult=[];
    applianceResult=[];
    ustensilsResult=[];
  
        console.time('main loop');
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
                applianceResult.push(appl);

                // liste ustensils
                let ust = recipeCard[i].dataset.ustensils.toLowerCase();
                let ustModified = ust.split(",");
                for (let i =0; i < ustModified.length; i ++) {
                    let ustensil = ustModified[i].toLowerCase();
                    ustensilsResult.push(ustensil);
                }
            } 
            else {
                recipeCard[i].style.display = "none";
            } 
            console.timeEnd('main loop') 
        }
        updateListIngredients(ingredientResult);
        updateListAppliances(applianceResult);
        updateListUstensils(ustensilsResult);
       
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
