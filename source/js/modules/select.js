export const select = function () {
    const selectElements = document.querySelectorAll('.select');

    selectElements.forEach(select => {
        const selectHeader = select.querySelector('.select__header');
        const selectBody = select.querySelector('.select__body');
        const selectItems = select.querySelectorAll('.select__item');
        const selectCurrent = select.querySelector('.select__current');

        if (!selectHeader || !selectBody || !selectItems || !selectCurrent) {
            console.error('❌ Ошибка в разметке. Проверь HTML.');
            return;
        }

        // Открытие/Закрытие списка при клике на select__header
        selectHeader.addEventListener('click', (e) => {
            e.stopPropagation(); // Останавливаем всплытие
            closeAllSelects(); // Закрываем все другие селекты
            select.querySelector('.select__wrapper').classList.toggle('is-active'); // Открываем/закрываем текущий
        });

        // Обработчик клика на элемент списка
        selectItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Останавливаем всплытие
                selectCurrent.innerText = item.innerText; // Заменяем текст в select__current
                select.querySelector('.select__wrapper').classList.remove('is-active'); // Закрываем список
            });
        });
    });

    // Закрытие всех селектов при клике вне их области
    document.addEventListener('click', closeAllSelects);

    // Функция для закрытия всех селектов
    function closeAllSelects() {
        document.querySelectorAll('.select__wrapper').forEach(select => {
            select.classList.remove('is-active');
        });
    }
};
