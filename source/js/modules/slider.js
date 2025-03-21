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
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const getGap = () => parseFloat(window.getComputedStyle(sliderList).gap) || 0;
    const getItemWidth = () => sliderItems[0]?.clientWidth || 0;
    const getVisibleItems = () => {
        const sliderWidth = sliderList.clientWidth;
        const itemWidth = getItemWidth();
        const gap = getGap();
        return itemWidth > 0 ? Math.floor((sliderWidth + gap) / (itemWidth + gap)) : 1;
    };
    const getLastItemIndex = () => Math.max(sliderItems.length - getVisibleItems(), 0);

    const scrollToCurrentItem = () => {
        const itemOffset = currentImgIndex * (getItemWidth() + getGap());
        const position = Math.min(itemOffset, sliderList.scrollWidth - sliderList.clientWidth);

        if (position === lastPosition) return;

        lastPosition = position;
        sliderList.scrollTo({ left: position, behavior: 'smooth' });

        updateButtons();
    };

    const updateButtons = () => {
        prevBtn.classList.toggle('is-hidden', currentImgIndex === 0);
        nextBtn.classList.toggle('is-hidden', currentImgIndex >= getLastItemIndex());
    };

    const resizeObserver = new ResizeObserver(() => {
        const lastItemIndex = getLastItemIndex();
        if (currentImgIndex > lastItemIndex) {
            currentImgIndex = lastItemIndex;
        }
        scrollToCurrentItem();
    });

    resizeObserver.observe(sliderList);

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

    sliderList.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    sliderList.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });

    sliderList.addEventListener('touchend', () => {
        if (!isDragging) return;
        const diff = startX - currentX;

        if (Math.abs(diff) > 50) { // Минимальное расстояние для свайпа
            if (diff > 0 && currentImgIndex < getLastItemIndex()) {
                currentImgIndex += 1;
            } else if (diff < 0 && currentImgIndex > 0) {
                currentImgIndex -= 1;
            }
            scrollToCurrentItem();
        }

        isDragging = false;
    });

    updateButtons();
};
