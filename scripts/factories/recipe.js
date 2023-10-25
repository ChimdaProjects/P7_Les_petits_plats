function recipeFactory (data, element) {
    const {appliance, description, name, ingredients, time, image} = data;

    const elt = element;
   
    function getRecipeCardDOM () {
        // creation section of recipe's list
        let cardsSection = document.querySelector("#list-recipes");
        const cardContainer = document.createElement("article");
        cardContainer.setAttribute("class", "card-recipe");
        cardsSection.appendChild(cardContainer); // l'article enfant de la liste

        // elements DOM img
        const imgContainer = document.createElement("div");
        imgContainer.setAttribute("class", "recipe-img");
        const img = document.createElement("img");
        cardContainer.appendChild(imgContainer);
        imgContainer.innerHTML=`
        <img src="./assets/images/recipes/${image}" 
        alt="illustration of recipe of ${name}"
        />
        `

        // elements DOM Header (title and duration)
        const divHeader = document.createElement("div");
        divHeader.setAttribute("class", "card-header");
        cardContainer.appendChild(divHeader);
        divHeader.innerHTML=`
        <h1 class="recipe-title">${name}</h1>
        <p class="recipe-time">
            ${time} min
        </p>
        `
        
        // Dom Elements description of recipe 
        const divContent = document.createElement("div");
        divContent.className = "recipe-content";
        divContent.innerHTML = `
        <div class="recipe-description">
        <h2 class="recipe-subtitle">Recette</h2>
        <p class="recipe-description-content">${description}</p 
        <div>
        `
        cardContainer.appendChild(divContent); // div recette enfant de l'article

        // DOM elements : list of ingredients
        const ingContainer = document.createElement("div");
        ingContainer.setAttribute("class", "recipe-ingr");
        
        ingContainer.innerHTML='<h2 class="recipe-subtitle">Ingrédients</h2>'
        let ul = document.createElement("ul");
        ul.setAttribute("class","recipe-ing")
        
        ingredients.forEach((elt)=> {
           
           if(!elt.quantity) {
                return ul.innerHTML+= `
                <li class="recipe-ingredient">
                    <p class="recipe-ing-name">${elt.ingredient}</p>
                </li>`
            }

            if (!elt.unit) {
                return ul.innerHTML+= `
                <li class="recipe-ingredient">
                    <p class="recipe-ing-name">${elt.ingredient}</p>
                    <p class="recipe-ing-quantity">${elt.quantity}</p>
                </li>`
            }  

            if ( elt.ingredient && elt.quantity && elt.unit) {
                return ul.innerHTML+= `
                    <li class="recipe-ingredient">
                        <p class="recipe-ing-name">${elt.ingredient}</p>
                        <p class="recipe-ing-quantity">${elt.quantity} ${elt.unit}</p>
                    </li>`
                
            } 
        
          
        })
        ingContainer.appendChild(ul);
        divContent.appendChild(ingContainer);
    }
        /**
         * This function creates each element of the list of ingredients, appliances or ustensils
         */
        function getList() {
            // create element DOM
          
            const listContainer = document.querySelector(`.list-${elt}`);
            const divList = document.createElement("div");
         
            listContainer.appendChild(divList);
            divList.setAttribute("class", `elt-${elt}`);
            divList.setAttribute("data-category", `${elt}`);

            // attribute value = data 
            divList.value = data;
            divList.textContent = data;

            // add event "onclick" on each element 
            const eltIng = document.querySelectorAll(`.elt-${elt}`);
            eltIng.forEach(elt => elt.addEventListener("click", displayTagElt)); 
        }

        function displayTag() {
            const sectionTag = document.querySelector("#tags-section");
            const contTag = document.createElement("div");
            contTag.className = "tag-container";
            contTag.setAttribute("value", `${data}`);
            sectionTag.appendChild(contTag);
            let dataReplace = data.replace(/ /g,"");
           
            contTag.innerHTML= `
           
            <button class="tag btn-${elt}" >
                ${data}
                <img src="assets/images/close_icon.svg" alt="icon close tag" class="close-icon" id="${dataReplace}" data-category="${elt}" onclick="deleteTag(event)" >
            </button>
            <div>
            </div>
            `  
        }
    return { getRecipeCardDOM, displayTag, getList }
}
