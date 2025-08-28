import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchedRecipe from './views/searchedView.js';
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
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
    const {results} = model.state.search;
    // resultsView.render(results)
    resultsView.render(model.getSearchResultsPage(4))

    // render initial pagination
    paginationView.render(model.state.search)
  }catch(err){
    console.log(err);
  }
}

// ['hashchange','load'].forEach(event => window.addEventListener(event,showRecipe));
const init = function(){
  recipeView.addHanlerRender(showRecipe);
  SearchedRecipe.addHandlerSearch(controlSearchResults);
}
init();
