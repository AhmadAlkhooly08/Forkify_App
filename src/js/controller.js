const recipeContainer = document.querySelector('.recipe');
const searchedValue = document.querySelector('.search')
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const desh = new Promise(function(resolve,reject){
  searchedValue.addEventListener('keydown',function(e){
    if(e.key === 'Enter'){
      e.preventDefault();
      resolve(e.target.closest('input').value);
      e.target.closest('input').value = '';
    }
  })
  
})
const Recipe = async function(dish){
  try{
    // const searchLabelData = ;
    const api = await fetch(`https://forkify-api.jonas.io/api/v2/recipes?search=${dish}`);
    const data = await api.json();
    console.log(data);
  } catch(err){
      console.log(`Something wrong ${err.message}`);
  }  
}

desh.then(e => Recipe(e))