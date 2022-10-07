// Variables
let recipesByTag = [];

// DOM elements
const inputSelectIng = document.querySelector("#myInput-ing2");
const inputSelectApp = document.querySelector("#myInput-app2");
const inputSelectUst = document.querySelector("#myInput-ust2");

/**
 * Research with tag(s) selected
 * @param {Array} arr Array filtered of main research
 * @param {Array} tagArr Array of tags selected
 * @param {String} cat - category of the tag (ing, app, ust)
 */
function searchByTag(arrFiltered, tagArr, cat) {
    recipesByTag = [];
    let arrFilteredByTag; // nouveau tableau filtré par tag
    let valueFiltered; // la valeur en cours filtrée

        tagArr.forEach((tag)=> { // pour chaque tag from array tagArr
            arrFilteredByTag =
            recipesByTag = [];
                // on filtre sur les résultats (array arrFiltered) de la première recherche
                arrFiltered.filter(( recipe ) => 
                {   
                    tagSelected = tag.toLowerCase();
                    switch ( cat ) {
                        case "ing" :
                            recipe.ingredients 
                            .forEach(element =>  
                                {
                                    valueFiltered = 
                                        element.ingredient
                                        .toLowerCase()
                                        .includes(tagSelected);

                                    
                                    if( valueFiltered ) {
                                        recipesByTag.push(recipe);
                                    }
                                });    
                            break;
                        
                        case "app" :
                            valueFiltered =  
                            recipe.appliance.toLowerCase().includes(tagSelected);
                           
                            if( valueFiltered ) {
                                recipesByTag.push(recipe);
                            }
                
                            break;
                        
                        case "ust" :
                            recipe.ustensils
                            .forEach(element =>  
                                {
                                    valueFiltered = 
                                        element
                                        .toLowerCase()
                                        .includes(tagSelected);
                                    
                                    if( valueFiltered ) {
                                        recipesByTag.push(recipe);
                                    }
                                });    
                            break;
    
                        default:
                            console.log(`Sorry, we are out of ${tag.category}.`);
                   }   
                });
            });

    // on vide le DOM pour chaque modification
    recipeSection.innerHTML="";
    listIng.innerHTML="";
    listApp.innerHTML="";
    listUst.innerHTML="";

    // suppression doublon
    let arrByTags = Array.from([...new Set(recipesByTag)]).sort();
    console.log("arrbytags sans doublon", arrByTags);

    // si le tableau est vide alors on affiche le msg d'erreur
    if (arrByTags.length == 0) {
        recipeSection.innerHTML = 
        `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes",
        "poisson", etc...`
    //sinon on affiche le resultat obtenu dans le tableau filteredArr
    } else {
        displayData(arrByTags);
    }
}

/**
 * This function searches for the element corresponding to the entry from select
 * @param {*} event - event
 * @param {*} arr - array of tags selected
 * @param {*} cat - category of tag (ing, app, ust)
 */
function searchInputSelect (event, arr, cat) {
    
    if( !valueSearched ) {
        if (tagsSelected.length == 0) {
            arr = recipesArray;
        } else {
            arr = recipesByTag
        }
    } else if ( valueSearched ) {
        if (tagsSelected.length == 0) {
            arr = filteredArr;
            console.log("arr = filteredArr")
        } else {
            arr = recipesByTag
            console.log("arr = recipesByTag")
        }
    }
   
    cat = event.target.id;
    let newArrayTags = [];
    let valueInput;

    switch (cat) {
        case "myInput-ing2" :
            valueInput = inputSelectIng.value;
            arr.forEach((recipe) => {
                recipe.ingredients.forEach(item => {
                    let resultFiltered = item.ingredient.toLowerCase().includes(valueInput.toLowerCase());
                    
                    if (resultFiltered) {
                        newArrayTags.push(item.ingredient);
                    }      
                })
                newArrayTagsFiltered = Array.from([...new Set(newArrayTags)]).sort();
                    updateList(newArrayTagsFiltered, "ing");
                });
                if (newArrayTags.length == 0) {
                    listIng.textContent = "Aucun ingrédient trouvé" 
                };   
            break;

        case "myInput-app2" :
            valueInput = inputSelectApp.value;
            console.log("arr.appliance", arr.appliance);
            arr.forEach((recipe) => {
                let resultFiltered =  
                recipe.appliance.toLowerCase().includes(valueInput.toLowerCase()); 
            
            if (resultFiltered) {
                newArrayTags.push(recipe.appliance);
            };      
            updateList(newArrayTags, "app");
            });
            if ( newArrayTags.length == 0 ) {
                listApp.textContent = "Aucun appareil trouvé"
            };   
            break;

        case "myInput-ust2" : 
        valueInput = inputSelectUst.value;
        arr.forEach((recipe) => {
            recipe.ustensils.forEach(item => {
                let resultFiltered = item.toLowerCase().includes(valueInput.toLowerCase());
                if (resultFiltered) {
                    newArrayTags.push(item);
                };      
            });
                updateList(newArrayTags, "ust");
            });
            if (newArrayTags.length == 0) {
                listUst.textContent = "Aucun ustensil trouvé"
            }    
            break;

        default:
            console.log(` not value : ${cat} for cat found !`)
    }
      
} 


   