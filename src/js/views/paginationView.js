import View from './View.js'
import icons from 'url:../../img/icons.svg'

class paginationView extends View{
    _parentEl = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentEl.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            
            if(!btn) return;
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        })
    }

    _generateMarkup(){

        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const curPage = this._data.page;

        // Page 1 and other pagees
        if(curPage === 1 && numPages > 1){
            return this.nextBtn(curPage)
        }

        // Last page
        if(curPage === numPages && numPages > 1){
            return this.prevBtn(curPage)
        }

        // other Page
        if(curPage < numPages && curPage > 1){

           return this.prevBtn(curPage) + this.nextBtn(curPage)
        }

        
        // Page 1 and No other pagees
        return '';
    }
    nextBtn(curPage){
        return`
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>

        `
    }

    prevBtn(curPage){
        return `
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage-1}</span>
            </button>

        `
    }
}

export default new paginationView();