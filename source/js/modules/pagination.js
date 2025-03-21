export const catalogPagination = () => {

    const catalogList = document.querySelector('.catalog__list');
    if (!catalogList) {
        return;
    }

    const allCards = Array.from(catalogList.children);
    if (allCards.length === 0) {
        return;
    }

    const cardsPerPage = 15; // Количество карточек на страницу
    let currentPage = 1;
    let currentShowMoreIndex = 1; // Отвечает за "Показать ещё"
    const totalPages = Math.ceil(allCards.length / cardsPerPage);

    const paginationPrev = document.querySelector('.pagination__arrow_prev');
    const paginationNext = document.querySelector('.pagination__arrow_next');
    const paginationFirst = document.querySelector('.pagination__page_first');
    const paginationLast = document.querySelector('.pagination__page_last');
    const showMoreButton = document.querySelector('.pagination__more');

    // Устанавливаем общее количество страниц в элемент
    if (paginationLast) {
        paginationLast.textContent = totalPages;
    }

    // Функция для отображения карточек по страницам
    const showCards = (page) => {
        allCards.forEach(card => card.style.display = 'none'); // Скрыть все карточки

        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        allCards.slice(start, end).forEach(card => card.style.display = '');

        if (paginationFirst) {
            paginationFirst.textContent = page;
        }

        if (paginationPrev) {
            paginationPrev.classList.toggle('disabled', page === 1);
        }
        if (paginationNext) {
            paginationNext.classList.toggle('disabled', page === totalPages);
        }

        if (showMoreButton && page < totalPages) {
            showMoreButton.style.display = 'block';
            currentShowMoreIndex = page;
        } else if (showMoreButton && page === totalPages) {
            showMoreButton.style.display = 'none';
        }
    };

    // Функция для кнопки "Показать ещё"
    const showMoreCards = () => {
        const start = currentShowMoreIndex * cardsPerPage;
        const end = start + cardsPerPage;

        allCards.slice(start, end).forEach(card => card.style.display = '');
        currentShowMoreIndex++;

        if (currentShowMoreIndex >= totalPages && showMoreButton) {
            showMoreButton.style.display = 'none';
        }
    };

    if (paginationPrev) {
        paginationPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showCards(currentPage);
            }
        });
    }

    if (paginationNext) {
        paginationNext.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showCards(currentPage);
            }
        });
    }

    if (showMoreButton) {
        showMoreButton.addEventListener('click', showMoreCards);
    }

    showCards(currentPage);
};
