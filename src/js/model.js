import { async } from "regenerator-runtime";
import * as config from './confing.js';
import {getJson} from './helpers.js'
export const state ={
    recipe:{},
    search:{
        query:'',
        results:[],
    },
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
    
    } catch(err){
        console.log(`${err} 💥💥💥💥`);
        throw err;
    }

}

export const loadSearchedResults = async function(query){
    try{
        state.search.query = query;
        const data = await getJson(`${config.API_URL}?search=${query}`);
        console.log(data);
        if(!data.results) throw new Error('no results found')
        
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