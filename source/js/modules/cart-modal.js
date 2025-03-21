export const cartModal = () => {
    const modal = document.getElementById('cartModal');
    const modalOverlay = document.querySelector('.overlay');
    const closeModalBtn = document.querySelector('.cart-modal__close');
    let modalTimeout;

    if (!modal || !modalOverlay) {
        return;
    }

    // Функция для показа модального окна
    const showCartModal = (action) => {
        clearTimeout(modalTimeout);

        modal.classList.add('show');
        modalOverlay.classList.add('show');
        document.body.classList.add('scroll-lock');

        const addText = modal.querySelector('[data-message="added"]');
        const deleteText = modal.querySelector('[data-message="deleted"]');

        if (action === 'add') {
            addText.classList.add('show');
            deleteText.classList.remove('show');
        } else if (action === 'delete') {
            deleteText.classList.add('show');
            addText.classList.remove('show');
        }

        modalTimeout = setTimeout(hideCartModal, 2000);
    };

    // Функция для скрытия модального окна
    const hideCartModal = () => {
        modal.classList.remove('show');
        modalOverlay.classList.remove('show');
        document.body.classList.remove('scroll-lock');
    };

    // Обработчик для кнопки закрытия
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideCartModal);
    }

    // Обработчик для клика по overlay
    modalOverlay.addEventListener('click', hideCartModal);

    // Добавление обработчиков через делегирование событий
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.card__button')) {
            showCartModal('add');
        }
        if (event.target.matches('.cart-item__delete')) {
            showCartModal('delete');
        }
    });
};
