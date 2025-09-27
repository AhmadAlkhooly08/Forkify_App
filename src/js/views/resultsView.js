import View from './View.js';
import Preview from "./preview.js";
import icons from 'url:../../img/icons.svg'

class resultView extends View{

    _parentEl = document.querySelector('.results');
    _ErrorMessage = 'No recipes found for your query! Please try again :)';
    _message = '';

    _generateMarkup(){
        return this._data.map(results => Preview.render(results,false)).join('');
    }
    
}
export default new resultView();