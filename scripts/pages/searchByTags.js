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
    console.log("********arrfiltered*************", arrFiltered);
    tagArr.forEach((tag)=> { // pour chaque tag from array tagArr
        arrFilteredByTag =
        recipesByTag = [];
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
            //return arrFilteredByTag;    
            });
        });
            console.log("recipeByTag", recipesByTag);

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

/** RECHERCHE EN SAISISSANT QLQCH DANS L'INPUT DU SELECT */
const inputSelectIng = document.querySelector("#myInput-ing2");
const inputSelectApp = document.querySelector("#myInput-app2");
const inputSelectUst = document.querySelector("#myInput-ust2");
inputSelectIng.addEventListener("keyup", searchInputSelect);

function searchInputCat(event) {
    let category = event.target.id;
    console.log("category", category);
    searchInputSelect(filteredArr, category)
}   

function searchInputSelect (arr, input) {
    //console.log("input", input);
    arr = filteredArr;
    //console.log("cat", cat);
    let newArray = [];
    console.log("arr", arr);
    //let result;
    let valueInput = inputSelectIng.value;
    console.log("value input select", valueInput);

        arr.forEach((recipe) => {
            recipe.ingredients.forEach(item => {
                //console.log("item", item)
                let resultFiltered = item.ingredient.toLowerCase().includes(valueInput.toLowerCase());
                
                //console.log(`result filtré / item: ${item.ingredient}`, resultFiltered );
    
                if (resultFiltered) {
                    newArray.push(item.ingredient);
                } 
                    
            })
            if (!newArray) {
                listIng.innerHTML = `Pas de resultat correspondant`
            }
            
            console.log("new array", newArray);
            updateList(newArray, "ing");
        })
       
        
    } 
   
    
   
    
    //let result =
      //      arr.filter(item => {
        //        console.log("item",item);
                //item.toLowerCase().includes(inputSelectIng.value.toLowerCase());
          //  })
    
    /*switch (inputCat) {
        case "ing" :
            result =
            arr.filter(item => {
                item
                .toLowerCase()
                .includes(inputSelectIng.value.toLowerCase());
            })
            updateList(result, inputCat);
            break;
        case "app" :
            result =
            arr.filter(item => {
                item
                .toLowerCase()
                .includes(inputSelectApp);
            })
            updateList(result, inputCat);
            break;
        case "ust" : 
            result =
            arr.filter(item => {
                item
                .toLowerCase()
                .includes(inputSelectUst);
            })
            updateList(result, inputCat);
            break;
        default :
        console.log("error category not found ! ")
    }*/
