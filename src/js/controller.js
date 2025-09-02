import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchedRecipe from './views/searchedView.js';
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js';
import * as confing from './confing.js'

// import icons from '../img/icons.svg' //! Parcel 1
import icons from 'url:../img/icons.svg' //^ Parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }

const showRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;

    // updating results view to active
    resultsView.update(model.getSearchResultsPage());

    // Loading recipe
    recipeView.renderSpiner();

    await model.loadRecipe(id) //!From model.js
    const {recipe} = model.state;

    // Rendring Recipe
    recipeView.render(recipe);

  } catch(err){
    alert(err)
    recipeView.renderErorr();
  }
}


const controlSearchResults = async function(){
  try{
    const query = SearchedRecipe.getQuery();

    if(!query) return;

    // Loading results
    resultsView.renderSpiner();

    await model.loadSearchedResults(query);

    // rendering results

    resultsView.render(model.getSearchResultsPage())

    // render initial pagination
    paginationView.render(model.state.search)
  }catch(err){
    console.log(err);
  }
}

const paginationController = function(goToPage){
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage))

  // render new pagination buttons
  paginationView.render(model.state.search)
}

const controllerServings = function(newServings){
  // update the recipe servings in state
    model.updateServings(newServings)
  // update recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

// ['hashchange','load'].forEach(event => window.addEventListener(event,showRecipe));
const init = function(){
  recipeView.addHanlerRender(showRecipe);
  SearchedRecipe.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationController);
  recipeView.addHandlerServings(controllerServings)
}
init();