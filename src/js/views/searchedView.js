import icons from 'url:../../img/icons.svg'
import * as confing from '../confing.js';
class SearchedView{
    #parentEl = document.querySelector('.results');
    #data;
    render(data){
        this.#data = data;
        console.log(this.#data);
        const markup = this.#generateResults();
        this.#clearDom();
        this.#parentEl.insertAdjacentHTML('afterbegin',markup)
    }

    #clearDom(){
        this.#parentEl.innerHTML = '';
    }
    getQuery(){
        const query = confing.SearchedValue.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }
    #clearInput(){
       return confing.SearchedValue.querySelector('.search__field').value = '';
    }
    addHandlerSearch(handler){
        confing.SearchedValue.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        })

    }
    renderSpiner(){
        const markup =
        `
        <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
        this.#clearDom();
        this.#parentEl.insertAdjacentHTML("afterbegin",markup)
        
    }
    
    #generateResults(){
        return this.#data.map(data =>{
            return`
                <ul class="results">
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
                </ul>
    
            `
        }).join('');
    }
}

export default new SearchedView();