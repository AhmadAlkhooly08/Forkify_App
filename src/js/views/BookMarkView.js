import View from "./View.js";
import Preview from "./preview.js";
class BookMarkView extends View{
    _parentEl = document.querySelector('.bookmarks__list');
    _ErrorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

    addHandlerrender(handler){
        window.addEventListener('load',handler)
    }
    _generateMarkup(){
        return this._data.map(bookmark => Preview.render(bookmark,false)).join('');
    }

}

export default new BookMarkView();