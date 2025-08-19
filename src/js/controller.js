import * as model from './model.js';
import recipeview from './views/recipeView.js';

// import icons from '../img/icons.svg' //! Parcel 1
import icons from 'url:../img/icons.svg' //^ Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// const renderSpinner = function(ParentEl){
//   const markup =
//   `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;
//   ParentEl.innerHTML = '';
//   ParentEl.insertAdjacentHTML("afterbegin",markup)
// }

const showRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    // Loading recipe
    recipeview.renderSpiner();

    await model.loadRecipe(id) //!From model.js
    const {recipe} = model.state;

    // Rendring Recipe
    recipeview.render(recipe);

  } catch(err){
    alert(err)

  }
}

// ['hashchange','load'].forEach(event => window.addEventListener(event,showRecipe));
window.addEventListener('hashchange',showRecipe)
window.addEventListener('load',showRecipe)