export const slider = () => {
    const sliders = document.querySelectorAll('.slider'); // Находим все слайдеры

    sliders.forEach((slider) => {
        const sliderList = slider.querySelector('.slider__list');
        const sliderItems = slider.querySelectorAll('.slider__item');
        const prevBtn = slider.querySelector('#slider__button_prev');
        const nextBtn = slider.querySelector('#slider__button_next');

        let currentImgIndex = 0;
        let lastPosition = 0;

        /**
         * Определяем gap между карточками (равен значению из CSS)
         */
        const getGap = () => {
            return parseFloat(window.getComputedStyle(sliderList).gap) || 0;
        };

        /**
         * Получаем ширину карточки
         */
        const getImgWidth = () => sliderItems[0].clientWidth;

        /**
         * Определяем, сколько карточек в ряду на текущем экране
         */
        const getVisibleItems = () => {
            const sliderWidth = sliderList.clientWidth;
            const itemWidth = getImgWidth();
            const gap = getGap();
            return Math.floor((sliderWidth + gap) / (itemWidth + gap));
        };

        /**
         * Определяем максимальный индекс карточки
         */
        const getLastImgIndex = () => {
            return sliderItems.length - getVisibleItems();
        };

        /**
         * Прокручиваем слайдер на нужное расстояние
         */
        const scrollToCurrentImg = () => {
            const imgOffset = currentImgIndex * (getImgWidth() + getGap());
            const position = Math.min(imgOffset, sliderList.scrollWidth - sliderList.clientWidth);

            if (position === lastPosition) return;

            lastPosition = position;
            sliderList.scrollTo({ left: position, behavior: 'smooth' });

            updateButtons();
        };

        /**
         * Показываем или скрываем кнопки, если листать нельзя
         */
        const updateButtons = () => {
            prevBtn.classList.toggle('is-hidden', currentImgIndex === 0);
            nextBtn.classList.toggle('is-hidden', currentImgIndex >= getLastImgIndex());
        };

        /**
         * Обработчик изменения размера экрана
         */
        window.addEventListener('resize', () => {
            const lastImgIndex = getLastImgIndex();
            if (lastImgIndex < currentImgIndex) {
                currentImgIndex = lastImgIndex;
            }
            scrollToCurrentImg();
        });

        /**
         * Обработчики кликов по кнопкам
         */
        prevBtn.addEventListener('click', () => {
            if (currentImgIndex > 0) {
                currentImgIndex -= 1;
                scrollToCurrentImg();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentImgIndex < getLastImgIndex()) {
                currentImgIndex += 1;
                scrollToCurrentImg();
            }
        });

        // Инициализация: скрываем кнопки, если листать нельзя
        updateButtons();
    });
};
