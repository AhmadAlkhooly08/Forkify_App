import View from "./View.js";

class BookMarkView extends View{
    _parentEl = document.querySelector('.bookmarks__list');

    _generateMarkup(){
        const id = window.location.hash.slice(1);
        return this._data.map(data =>{
            return`
                <li class="preview">
                    <a class="preview__link ${data.id === id ? 'preview__link--active' : ''}" href="#${data.id}">
                    <figure class="preview__fig">
                        <img src="${data.img}" alt="$this._{data.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${data.title}</h4>
                        <p class="preview__publisher">${data.publisher}</p>
                    </div>
                    </a>
                </li>
            `
        }).join('')
    }
}

export default new BookMarkView();