export let select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item'); // Исправлено здесь

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle);
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose);
    });

    function selectToggle() {
        let parent = this.parentElement;

        // Проверяем, открыт ли уже селект
        if (parent.classList.contains('is-active')) {
            // Если открыт, закрываем его
            parent.classList.remove('is-active');
        } else {
            // Закрываем все селекты перед открытием нового
            closeAllSelects();
            // Открываем текущий селект
            parent.classList.add('is-active');
        }
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active'); // Закрываем селект после выбора
    }

    // Закрытие селекта при клике вне его области
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.select')) {
            closeAllSelects();
        }
    });

    // Функция закрытия всех селектов
    function closeAllSelects() {
        document.querySelectorAll('.select').forEach(select => {
            select.classList.remove('is-active');
        });
    }
};
