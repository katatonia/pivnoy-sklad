import {
	toggleNavMenus
} from './modules/toggle-nav-menus.js';

import {
	initSlider
} from './modules/slider.js';
import {
	createMap
} from './modules/map.js';

document.addEventListener("DOMContentLoaded", () => {
	toggleNavMenus();
	createMap();

	initSlider('.new__slider', '.slider__list', '.slider__item', '.slider__button_prev', '.slider__button_next');
	initSlider('.leaders__slider', '.slider__list', '.slider__item', '.slider__button_prev', '.slider__button_next');
	initSlider('.projects-section__slider', '.projects-section__list', '.project', '.slider__button_prev', '.slider__button_next');
});
