import { async } from "regenerator-runtime";
import * as config from './confing.js';
import {getJson} from './helpers.js'
export const state ={
    recipe:{},
}

export const loadRecipe = async function(id){

    try{
        const data = await getJson(`${config.API_URL}/${id}`)

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
    
    } catch(err){
        console.log(`${err} 💥💥💥💥`);
    }

}