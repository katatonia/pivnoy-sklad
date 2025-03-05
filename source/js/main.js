import { toggleNavMenus } from './modules/toggle-nav-menus.js';
import { accordion } from './modules/accordion.js';
import { initSlider } from './modules/slider.js';

document.addEventListener("DOMContentLoaded", () => {
	toggleNavMenus();
	accordion();

    initSlider('.new__slider', '.slider__list', '.slider__item', '.slider__button_prev', '.slider__button_next');
    initSlider('.leaders__slider', '.slider__list', '.slider__item', '.slider__button_prev', '.slider__button_next');
    initSlider('.projects-section__slider', '.projects-section__list', '.project', '.slider__button_prev', '.slider__button_next');
});
