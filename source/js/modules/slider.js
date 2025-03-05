export const initSlider = (sliderSelector, listSelector, itemSelector, prevBtnSelector, nextBtnSelector) => {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const sliderList = slider.querySelector(listSelector);
    const sliderItems = slider.querySelectorAll(itemSelector);
	const prevBtn = slider.querySelector(prevBtnSelector);
	const nextBtn = slider.querySelector(nextBtnSelector);

    if (!sliderList || sliderItems.length === 0 || !prevBtn || !nextBtn) return; // Проверка наличия элементов

    let currentImgIndex = 0;
    let lastPosition = 0;

    /**
     * Определяем gap между карточками (равен значению из CSS)
     */
    const getGap = () => parseFloat(window.getComputedStyle(sliderList).gap) || 0;

    /**
     * Получаем ширину карточки
     */
    const getItemWidth = () => sliderItems[0]?.clientWidth || 0;

    /**
     * Определяем, сколько карточек в ряду на текущем экране
     */
    const getVisibleItems = () => {
        const sliderWidth = sliderList.clientWidth;
        const itemWidth = getItemWidth();
        const gap = getGap();
        return itemWidth > 0 ? Math.floor((sliderWidth + gap) / (itemWidth + gap)) : 1;
    };

    /**
     * Определяем максимальный индекс карточки
     */
    const getLastItemIndex = () => Math.max(sliderItems.length - getVisibleItems(), 0);

    /**
     * Прокручиваем слайдер на нужное расстояние
     */
    const scrollToCurrentItem = () => {
        const itemOffset = currentImgIndex * (getItemWidth() + getGap());
        const position = Math.min(itemOffset, sliderList.scrollWidth - sliderList.clientWidth);

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
        nextBtn.classList.toggle('is-hidden', currentImgIndex >= getLastItemIndex());
    };

    /**
     * Обработчик изменения размера экрана через ResizeObserver
     */
    const resizeObserver = new ResizeObserver(() => {
        const lastItemIndex = getLastItemIndex();
        if (currentImgIndex > lastItemIndex) {
            currentImgIndex = lastItemIndex;
        }
        scrollToCurrentItem();
    });

    resizeObserver.observe(sliderList);

    /**
     * Обработчики кликов по кнопкам (привязываем только к своему слайдеру)
     */
    prevBtn.addEventListener('click', () => {
        if (currentImgIndex > 0) {
            currentImgIndex -= 1;
            scrollToCurrentItem();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImgIndex < getLastItemIndex()) {
            currentImgIndex += 1;
            scrollToCurrentItem();
        }
    });

    // Инициализация: скрываем кнопки, если листать нельзя
    updateButtons();
};
