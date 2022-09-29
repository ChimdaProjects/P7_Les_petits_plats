// Variables
let recipesByTag = [];

/**
 * Research with tag(s) selected
 * @param {Array} arr Array filtered of main research
 * @param {Array} tagArr Array of tags selected
 */
function searchByTag(arrFiltered, tagArr, cat) {

    recipesByTag = [];
    // déclaration variables
    let arrFilteredByTag; // nouveau tableau filtré par tag
    let valueFiltered; // la valeur en cours filtrée
    
    tagArr.forEach((tag)=> { // pour chaque tag from array tagArr
        arrFilteredByTag =
            // on filtre sur les résultats (array arrFiltered) de la première recherche
            arrFiltered.filter(( recipe ) => 
            {   
                tagSelected = tag.toLowerCase();
                console.log("tagselected", tagSelected);

                switch ( cat ) {
                    case "ing" :
                        recipe.ingredients 
                        .forEach(element =>  
                            {
                                valueFiltered = 
                                    element.ingredient
                                    .toLowerCase()
                                    .includes(tagSelected);

                                console.log(` 
                                -----
                                valuefiltered ing: recipe: ${recipe.name} - value tested: ${element.ingredient} 
                                -----`, valueFiltered);
                                
                                if( valueFiltered ) {
                                    recipesByTag.push(recipe);
                                }
                                console.log("--- recipesByTag array: ---- ", recipesByTag);
                            });    
                        break;
                    
                    case "app" :
                        valueFiltered =  
                        recipe.appliance.toLowerCase().includes(tagSelected);
                        console.log(` 
                        -----
                        valuefiltered app: recipe: ${recipe.name} - value tested: ${recipe.appliance} 
                        -----`, valueFiltered);
                        
                        if( valueFiltered ) {
                            recipesByTag.push(recipe);
                        }
                        console.log("--- recipesByTag array: ---- ", recipesByTag);
                        break;
                    
                    case "ust" :
                        recipe.ustensils
                        .forEach(element =>  
                            {
                                valueFiltered = 
                                    element
                                    .toLowerCase()
                                    .includes(tagSelected);

                                console.log(` 
                                -----
                                valuefiltered ing: recipe: ${recipe.name} - value tested: ${element} 
                                -----`, valueFiltered);
                                
                                if( valueFiltered ) {
                                    recipesByTag.push(recipe);
                                }
                                console.log("--- recipesByTag array: ---- ", recipesByTag);
                            });    
                        break;

                    default:
                        console.log(`Sorry, we are out of ${tag.category}.`);
               }
            return arrFilteredByTag;    
            });
        });
            console.log("recipeByTag", recipesByTag);

// on vide le DOM pour chaque modification
let cardsSection = document.querySelector("#list-recipes");
cardsSection.innerHTML="";
let listIng = document.querySelector(".list-ing");
listIng.innerHTML="";
let listApp = document.querySelector(".list-app");
listApp.innerHTML="";
let listUst= document.querySelector(".list-ust");
listUst.innerHTML="";

// suppression doublon
let arrByTags = Array.from([...new Set(recipesByTag)]).sort();
console.log("arrbytags sans doublon", arrByTags);

// si le tableau est vide alors on affiche le msg d'erreur
if (arrByTags.length == 0) {
    cardsSection.innerHTML = 
    `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes",
    "poisson", etc...`
//sinon on affiche le resultat obtenu dans le tableau filteredArr
} else {
    displayData(arrByTags);
}
}

function searchByTagAfterRemove (arr, tags, cat) {
    if(tags.length== 0) {
        // on vide le dom
        let cardsSection = document.querySelector("#list-recipes");
        cardsSection.innerHTML="";
        displayData(arr);
    } else {
        searchByTag(arr, tags, cat)
    }
}