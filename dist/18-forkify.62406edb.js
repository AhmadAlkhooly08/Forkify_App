const recipeContainer = document.querySelector('.recipe');
const searchedValue = document.querySelector('.search');
const searchedResults = document.querySelector('.search-results');
const everySingleRecipe = document.querySelector('.preview');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const renderRecipes = function(data) {
    const markup = data.data.recipes.map((element)=>{
        return `
       <li class="preview">
            <a class="preview__link preview__link--active" href="#23456">
              <figure class="preview__fig">
                <img src="${element.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${element.title}</h4>
                <p class="preview__publisher">${element.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
    }).join('');
    searchedResults.innerHTML = markup;
};
const showError = (msg)=>searchedResults.innerHTML = `<h1 style ="text-align:center">${msg}</h1>`;
const Recipe = async function(dish) {
    try {
        // const searchLabelData = ;
        const api = await fetch(`https://forkify-api.jonas.io/api/v2/recipes?search=${dish}`);
        const data = await api.json();
        renderRecipes(data);
        if (data.data.recipes.length === 0) showError("No recipes found \uD83D\uDE0A");
        console.log(data);
    } catch (err) {
        console.log(`Something wrong ${err.message}`);
    }
};
searchedValue.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        Recipe(e.target.value);
        e.target.value = '';
        searchedResults.innerHTML = '';
    }
});

//# sourceMappingURL=18-forkify.62406edb.js.map
