function recipeFactory (data, element) {
    const {appliance, description, name, ingredients, time} = data;
    const elt = element;
    //console.log("data", data);
   
    function getRecipeCardDOM () {
        let cardsSection = document.querySelector("#list-recipes");
        const cardContainer = document.createElement("article");
        cardContainer.setAttribute("class", "card-recipe");
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
            ${time} min
        </p>
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
        /**
         * This function creates each element of the list of ingredients, appliances or ustensils
         */
        function getList() {
            // create element DOM
          
            const listContainer = document.querySelector(`.list-${elt}`);
            //console.log("menu container", menuContainer);
            const divList = document.createElement("div");
         
            listContainer.appendChild(divList);
            divList.setAttribute("class", `elt-${elt}`);
            divList.setAttribute("data-category", `${elt}`);

            // attribute value = data 
            divList.value = data;
            divList.textContent = data;

            // add event "onclick" on each element 
            const eltIng = document.querySelectorAll(`.elt-${elt}`);
            //console.log("eltIng", eltIng)
            eltIng.forEach(elt => elt.addEventListener("click", displayTagIng));
            
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
                <img src="assets/icons/circle-xmark-regular.svg" alt="icon close tag" class="close-icon" id="${dataReplace}" onclick="deleteTag(event)" >
            </button>
            <div>
            </div>
            `  
        }

      
    return { getRecipeCardDOM, displayTag, getList }
}

        /*
        function getListOfIngredients () {
            // create element DOM
            const menuContainer = document.querySelector(".list-ing");
            const divList = document.createElement("div");
            menuContainer.appendChild(divList);
            divList.setAttribute("class", "elt-ing");

            // attribute value = data 
            divList.value = data;
            divList.textContent = data;

            // add event "click" on each ingredient 
            const eltIng = document.querySelectorAll(".elt-ing");
            eltIng.forEach(elt => elt.addEventListener("click", displayTagIng)); 

            
    }
        function getListOfAppliances () {
            const menuContainer = document.querySelector(".list-app");
            const divList = document.createElement("div");
            menuContainer.appendChild(divList);
            divList.setAttribute("class", "elt-app");
            divList.value = data;
            divList.textContent=data;
            const eltIng = document.querySelectorAll(".elt-app");
            eltIng.forEach(elt => elt.addEventListener("click", displayTagIng)); 
        }

        function getListOfUstensils() {
            const menuContainer = document.querySelector(".list-ust");
            const divList = document.createElement("div");
            menuContainer.appendChild(divList);
            divList.setAttribute("class", "elt-ust");
            divList.value = data;
            divList.textContent=data;
            const eltIng = document.querySelectorAll(".elt-ust");
            eltIng.forEach(elt => elt.addEventListener("click", displayTagIng)); 
        }
        */