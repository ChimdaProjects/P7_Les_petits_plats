function recipeFactory (data) {
    const {appliance, description, name, ingredients, time} = data;
    //console.log("data", data);
   
 

    function getRecipeCardDOM () {
        let cardsSection = document.querySelector("#list-recipes");
        const cardContainer = document.createElement("article");
        // elements DOM img
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("class", "recipe-img");
        const img = document.createElement("img");
        cardContainer.appendChild(imgContainer);
        imgContainer.appendChild(img);
        // elements DOM Header
        const divHeader = document.createElement("div");
        divHeader.setAttribute("class", "card-header");
        cardContainer.appendChild(divHeader);
        divHeader.innerHTML=`
        <h1 class="recipe-title">${name}</h1>
        <p class="recipe-time">
        <i class="fa-solid fa-clock"></i>
        ${time} min</p>
        `
        // DOM elements : list of ingredients
        const ingContainer = document.createElement("div");
        ingContainer.setAttribute("class", "recipe-ingr")
        cardContainer.appendChild(ingContainer);
        let ul = document.createElement("ul");
        ingContainer.appendChild(ul);
        ingredients.forEach((elt)=> {
            if(!elt.quantity) {
                return ul.innerHTML+= `${elt.ingredient} </br>`
            }

            if (!elt.unit) {
                return ul.innerHTML+= `${elt.ingredient}: ${elt.quantity}  </br>`
            }  

            if ( elt.ingredient && elt.quantity && elt.unit) {
                return (ul.innerHTML+= `${elt.ingredient}: ${elt.quantity} ${elt.unit} </br>`)
            }
             
        })
        // Dom Elements description
        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "recipe-description";
        cardContainer.appendChild(descriptionContainer);
        descriptionContainer.innerHTML = `
        <p class="recipe-description-content">${description}</p 
        `
        
        const divContent = document.createElement("div");
        cardContainer.appendChild(divContent);
        divContent.className = "recipe-content";
        divContent.appendChild(ingContainer);
        divContent.appendChild(descriptionContainer);
       


        cardsSection.appendChild(cardContainer);
    }
        function getListOfIngredients () {
            const menuContainer = document.querySelector(".list-ing");
            const divList = document.createElement("div");
            menuContainer.appendChild(divList);
            divList.setAttribute("class", "elt-ing");
            divList.textContent=data;
    }
    return { getRecipeCardDOM, getListOfIngredients }
}