import { async } from "regenerator-runtime";
import * as config from './confing.js';
import {getJson} from './helpers.js'
// import { search } from "core-js/fn/symbol";
export const state ={
    recipe:{},
    search:{
        query:'',
        results:[],
        page: 1,
        resultsPerPage: config.RES_PER_PA,
    },
    BookMark:[],
}

export const loadRecipe = async function(id){

    try{
        const data = await getJson(`${config.API_URL}${id}`)

        const {recipe} = data.data;
        state.recipe = {
          id: id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          img: recipe.image_url,
          cookingTimes: recipe.cooking_time,
          ingredients: recipe.ingredients,
          servings: recipe.servings,
        } 

        if(state.BookMark.some(bookmark => bookmark.id === id))
            state.recipe.BookMarked = true;
        else state.recipe.BookMarked = false;

        console.log(state.recipe);
    } catch(err){
        console.log(`${err} 💥💥💥💥`);
        throw err;
    }

}

export const loadSearchedResults = async function(query){
    try{
        state.search.query = query;
        const data = await getJson(`${config.API_URL}?search=${query}`);

        const {recipes} = data.data;
        state.search.results = recipes.map(rec=>{
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                img: rec.image_url,
            }
        });
    }catch(err){
        console.log(`${err} 💥💥💥💥`);
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page -1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start,end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing =>{
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    })
    state.recipe.servings = newServings;
}

export const setBookMarks = function(recipe){

    const check = state.BookMark.some((data,i) => data.id === state.recipe.id);
    
    if(!check) state.BookMark.push(recipe);

}