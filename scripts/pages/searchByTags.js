// Variables
let recipesByTag = [];

/**
 * Research with tag(s) selected
 * @param {Array} arr Array filtered of main research
 * @param {Array} tagArr Array of tags selected
 */
function searchByTag(arrFiltered, tagArr, cat) {
    //console.log("cat",cat);
    //console.log("arrFiltered", arrFiltered);
    //console.log("tagArr", tagArr);
    recipesByTag = [];
    // déclaration variables
    let arrFilteredByTag; // nouveau tableau filtré par tag
    let valueFiltered; // la valeur en cours filtrée
    
    tagArr.forEach((tag)=> { // pour chaque tag from array tagArr
        // tag sélectionné
       
        arrFilteredByTag =
            // on filtre sur les résultats (array arrFiltered) de la première recherche
            arrFiltered.filter(( recipe ) => 
            
            {   
                
               
                // filtre par ingrédients - test 
                tagSelected = tag.toLowerCase();
                console.log("tagselected", tagSelected);
                recipe.ingredients 
                // pour chaque ingrédient (element) du array ingredients, je compare si la valeur du tag est inclue dans l'ingrédient en cours.
                .forEach(element =>  
                    {
                        
                        let valueFiltered = 
                            element.ingredient
                            .toLowerCase()
                            .includes(tagSelected);

                        console.log(` 
                        -----
                        valuefiltered: recipe: ${recipe.name} - value tested: ${element.ingredient} 
                        -----`, valueFiltered);
                        
                        if( valueFiltered ) {
                            recipesByTag.push(recipe);
                        }
                        console.log("recipesByTag array: ", recipesByTag);
                    }    
                );
            return arrFilteredByTag;    
            }
            );
        });
            console.log("recipeByTag", recipesByTag);


          
          
            
           
       

            /*arrFiltered.filter((el)=> {
            // filtre sur le nom de la recette, description ou ingredients
            switch (tag.category) {
                case "ing" : 
                    console.log("je suis dans filter ing !")
                    return valueFiltered = 
                    el.ingredients.forEach( element => {
                        console.log("element ing", element);
                        element.ingredient.toLowerCase().includes(tagSelected);
                    });
                    
                    break;

                case "app" :
                    console.log("je suis dans filter app !")
                    valueFiltered =  
                    el.appliance.toLowerCase().includes(tagSelected);
                  

                    break;

                case "ust" :

                    console.log("je suis dans filter ust!")
                    valueFiltered = 
                    el.ustensils.forEach(element => {
                         element.toLowerCase().includes(tagSelected);
                    })

                    break;
                
                    default :
                    console.log(`Sorry, we are out of ${tag.category}.`);


                
            }
            console.log("value filtered1", valueFiltered);
             //console.log("ingr", ingr);
            });  
            console.log("value filtered2", valueFiltered);
         return valueFiltered;*/


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
        displayData(arr);
    } else {
        searchByTag(arr, tags, cat)
    }
}