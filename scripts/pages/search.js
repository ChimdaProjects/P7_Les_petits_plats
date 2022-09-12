let searchBarInput = document.getElementById("search-input");
console.log("value input", searchBarInput);
let valueSearched;
let filteredArr;
searchBarInput.addEventListener("input", searchBar);

function searchBar(e) {
    valueSearched = (e.target.value).toLowerCase();
    console.log("value", valueSearched);
    mainSearch(valueSearched, recipesArray);
}

function mainSearch(value, arr) {
    
    filteredArr = arr.filter((el)=> {
        el.name.toLowerCase().includes(value);
        
    });
    console.log("tab filtré", filteredArr)
    
    displayData(filteredArr);
}

