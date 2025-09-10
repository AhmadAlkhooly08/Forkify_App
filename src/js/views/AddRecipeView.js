import View from "./View.js";
class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");

  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor(){
    super();
    this._btnOpen.addEventListener('click',this._ToggleWindow.bind(this))
    this._btnClose.addEventListener('click',this._ToggleWindow.bind(this))
    this._overlay.addEventListener('click',this._ToggleWindow.bind(this))
    // this.addHandlerUpload()
  }

  _ToggleWindow(){
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  addHandlerUpload(handler){
    this._parentEl.addEventListener('submit',function(e){
      e.preventDefault();
      const dataArr = [...new FormData(this)]
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
