class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const search = this._parentElement.querySelector('.search__field').value;
    this._clearInputField();
    return search;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInputField() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
