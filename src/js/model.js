import { async } from "regenerator-runtime";
import * as config from "./confing.js";
import { AJAX} from "./helpers.js";
import { locale } from "core-js";
import BookMarkView from "./views/BookMarkView.js";
// import { search } from "core-js/fn/symbol";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: config.RES_PER_PA,
  },
  BookMark: [],
};

const UpdateRecipe = function(data){
    const { recipe } = data.data;
    return{
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      img: recipe.image_url,
      cookingTimes: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      ...(recipe.key && {key: recipe.key})
    };
}
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${config.API_URL}${id}?key=${config.KEY}`);

    state.recipe = UpdateRecipe(data);

    if (state.BookMark.some((bookmark) => bookmark.id === id))
      state.recipe.BookMarked = true;
    else state.recipe.BookMarked = false;

    console.log(state.recipe);
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const loadSearchedResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${config.API_URL}?search=${query}&key=${config.KEY}`);

    const { recipes } = data.data;
    state.search.results = recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        img: rec.image_url,
        ...(rec.key && {key: rec.key})
      };
    });
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem("bookMark", JSON.stringify(state.BookMark));
};

export const setBookMarks = function (recipe) {
  const check = state.BookMark.some((data, i) => data.id === state.recipe.id);

  if (!check) state.BookMark.push(recipe);

  // set recipe.BookMarked to bookmarked
  if (recipe.id === state.recipe.id) state.recipe.BookMarked = true;
  persistBookmarks();
};

export const deleteBookMark = function (id) {
  const index = state.BookMark.findIndex((el) => el.id === id);
  state.BookMark.splice(index, 1);

  // set recipe.BookMarked to not bookmarked
  if (id === state.recipe.id) state.recipe.BookMarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookMark");
  if (storage) state.BookMark = JSON.parse(storage);
};

init();

const clearBookMarkStorage = function () {
  localStorage.clear("bookMark");
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(
      (entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map(ing =>{
        const ingArr = ing[1].split(',').map(el => el.trim());

        if(ingArr.length !== 3) throw new Error('Wrong ingrediant Format! Please use the correct format :)');

        const [quantity,unit,description] = ingArr;
        return {quantity: quantity ? +quantity : null,unit,description};
      });

    const recipe ={
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    }
    console.log(JSON.stringify(recipe, null, 2));
    const recipeData = await AJAX(`${config.API_URL}?key=${config.KEY}`,recipe);

    state.recipe = UpdateRecipe(recipeData); 
    console.log(state.recipe);

    setBookMarks(state.recipe);
  } catch (err) {
    throw err
  }

};
