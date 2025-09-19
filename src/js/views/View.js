import icons from 'url:../../img/icons.svg'
export default class View{

    _data;

    /**
     * Render the Recieved object to the Dom
     * @param {object | Object[]} data the data to be render (e.g recipe)
     * @param {Boolean} [result = true] result  if false, create a markup string instead of rendering to the Dom
     * @returns {undefined | string} returns markup string if result = false
     * @this {object} View instance
     * @todo complete implementation
     * @author Ahmad alkhooly
     */
    render(data,result = true){
        if(!data || (Array.isArray(data)) && data.length === 0) return this.renderErorr();
        this._data = data;
        const markup = this._generateMarkup();
        if(!result) return markup;
        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin",markup);
    }

    update(data){
        this._data = data;
        const markup = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(markup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));
        

        newElements.forEach((newEl,i)=>{
            const curEl = curElements[i];

            // updates changed text
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
                curEl.textContent = newEl.textContent;
            }

            // updates changed Attributes
            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name,attr.value))
            }
        })
    }
    _clear(){
        this._parentEl.innerHTML = '';
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
        this._clear();
        this._parentEl.insertAdjacentHTML("afterbegin",markup)
        
    }

    renderErorr(message = this._ErrorMessage){
        const markup = `
            <div class="error">
                <div>
                    <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup)
    }
    renderMessage(message = this._message){
        const markup = `
            <div class="message">
                <div>
                    <svg>
                    <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin',markup)
    }

}