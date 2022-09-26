

let arrFilteredByTag;
// recherche par tag quand on clique sur un tag
/**
 * Research with tag(s) selected
 * @param {Array} arr Array filtered of main research
 * @param {Array} tagArr Array of tags selected
 */
function searchByTag(arr, tagArr) {
    tagArr.forEach((tag)=> {
        arrFilteredByTag =
            arr.filter((el)=> {
            // filtre sur le nom de la recette, description ou ingredients
                let valueFiltered = 
                el.name.toLowerCase().includes(tag) || 
                el.description.toLowerCase().includes(tag) || 
                el.ingredients.forEach(element => {
                let ingr = element.ingredient.toLowerCase().includes(tag);
             //console.log("ingr", ingr);
         });  
         return valueFiltered;
    })
    console.log("array recipes by tag", arrFilteredByTag);
});

// on vide le DOM pour chaque modification
let cardsSection = document.querySelector("#list-recipes");
cardsSection.innerHTML="";
let listIng = document.querySelector(".list-ing");
listIng.innerHTML="";
let listApp = document.querySelector(".list-app");
listApp.innerHTML="";
let listUst= document.querySelector(".list-ust");
listUst.innerHTML="";
 //console.log("tab filtré", filteredArr);
// si le tableau est vide alors on affiche le msg d'erreur
if (arrFilteredByTag.length == 0) {
    cardsSection.innerHTML = 
    `Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes",
    "poisson", etc...`
//sinon on affiche le resultat obtenu dans le tableau filteredArr
} else {
    displayData(arrFilteredByTag);
}

}