import View from './View.js'
import icons from 'url:../../img/icons.svg'

class resultView extends View{

    _parentEl = document.querySelector('.results');
    _ErrorMessage = 'No recipes found for your query. Please try again!';
    _message = '';

    _generateMarkup(){
        return this._data.map(data =>{
            return`
                <li class="preview">
                    <a class="preview__link preview__link--active" href="#${data.id}">
                    <figure class="preview__fig">
                        <img src="${data.img}" alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${data.title}</h4>
                        <p class="preview__publisher">${data.publisher}</p>
                        <div class="preview__user-generated">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                        </div>
                    </div>
                    </a>
                </li>
            `
        }).join('');
    }
}
export default new resultView();