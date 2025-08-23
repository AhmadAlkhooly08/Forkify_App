import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from '../img/icons.svg' //! Parcel 1
import icons from 'url:../img/icons.svg' //^ Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const showRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    // Loading recipe
    recipeView.renderSpiner();

    await model.loadRecipe(id) //!From model.js
    const {recipe} = model.state;

    // Rendring Recipe
    recipeView.render(recipe);

  } catch(err){
    alert(err)
    recipeView.generateErorr();
  }
}

// ['hashchange','load'].forEach(event => window.addEventListener(event,showRecipe));
const init = function(){
  recipeView.addHanlerRender(showRecipe);
}
init();