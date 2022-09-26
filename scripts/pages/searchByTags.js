// faire une recherche sur le tableau filteredArr
// utiliser le tableau tagSelected


// recherche par tag quand on clique sur un tag
function searchByTag(arr, tagElt) {
   let arrFilteredByTag =
   arr.filter((el)=> {
    // filtre sur le nom de la recette, description ou ingredients
    let valueFiltered = 
        el.name.toLowerCase().includes(tagElt) || 
        el.description.toLowerCase().includes(tagElt) || 
        el.ingredients.forEach(element => {
        let ingr = element.ingredient.toLowerCase().includes(tagElt);
        //console.log("ingr", ingr);
    });  
    return valueFiltered;
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