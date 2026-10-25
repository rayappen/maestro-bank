import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (curPage === 1 && numPages > 1) {
      return this._getPaginationHTML(curPage, 'next');
    }

    if (curPage === numPages && numPages > 1) {
      return this._getPaginationHTML(curPage, 'prev');
    }

    if (curPage < numPages && curPage > 1) {
      return `
        ${this._getPaginationHTML(curPage, 'prev')}
        ${this._getPaginationHTML(curPage, 'next')}
      `;
    }

    return 'one';
  }

  _getPaginationHTML(curPage, direction) {
    const isPrev = direction === 'prev';
    const targetPage = isPrev ? curPage - 1 : curPage + 1;
    const iconName = isPrev ? 'icon-arrow-left' : 'icon-arrow-right';
    const btnClass = isPrev ? 'pagination__btn--prev' : 'pagination__btn--next';

    return `
      <button data-goto="${targetPage}" class="btn--inline ${btnClass}">
          <svg class="search__icon">
              <use href="${icons}#${iconName}"></use>
          </svg>
          <span>Page ${targetPage}</span>
      </button>
    `;
  }

  addHandlerPagination(handler) {
    this._parentElement
      //   .querySelector('.btn--inline')
      .addEventListener('click', function (e) {
        // e.preventDefault();
        const btn = e.target.closest('.btn--inline');

        if (!btn) return;

        const goToPage = +btn.dataset.goto;
        handler(goToPage);
      });
  }
}

export default new PaginationView();
