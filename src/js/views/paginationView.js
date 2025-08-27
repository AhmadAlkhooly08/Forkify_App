import View from './View.js'
import icons from 'url:../../img/icons.svg'

class paginationView extends View{
    _parentEl = document.querySelector('.pagination');

    _generateMarkup(){

        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        
        // Page 1 and other pagees
        if(this._data.page === 1 && numPages > 1){
            return`
                <button class="btn--inline pagination__btn--next">
                    <span>Page 2</span>
                    <svg class="search__icon">
                        <use href="${icons}icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }

        // Last page
        if(this._data.page === numPages && numPages > 1){
            return`
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
            `
        }

        // other Page
        if(this._data.page < numPages && this._data.page > 1){
            return`
                <button class="btn--inline pagination__btn--next">
                    <span>Page 2</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>

                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
            `
        }

        // Page 1 and No other pagees

    }
}

export default new paginationView();