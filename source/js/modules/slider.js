export const slider = () => {
    const sliderBtns = document.querySelectorAll('.slider__button');
    const sliderList = document.querySelector('.slider__list');
    const sliderItems = document.querySelectorAll('.slider__item');

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
        const prevBtn = document.getElementById('slider__button_prev');
        const nextBtn = document.getElementById('slider__button_next');

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
    sliderBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const direction = btn.id === 'slider__button_prev' ? -1 : 1;

            if (direction > 0 && currentImgIndex >= getLastImgIndex()) return;
            if (direction < 0 && currentImgIndex <= 0) return;

            currentImgIndex += direction;
            scrollToCurrentImg();
        });
    });

    // Инициализация: скрываем кнопки, если листать нельзя
    updateButtons();
};
