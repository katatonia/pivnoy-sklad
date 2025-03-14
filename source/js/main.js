import { toggleNavMenus } from './modules/toggle-nav-menus.js';
import { initSlider } from './modules/slider.js';
import { createMap } from './modules/map.js';
import { toggleFavorite } from './modules/favorite.js';
import { counter } from './modules/counter.js';
import { filter } from './modules/filter.js';

document.addEventListener("DOMContentLoaded", () => {
	toggleNavMenus();
	createMap();
	toggleFavorite();
	counter();
	filter();

	initSlider('.new__slider', '.slider__list', '.slider__item', '.slider__arrow_prev', '.slider__arrow_next');
	initSlider('.leaders__slider', '.slider__list', '.slider__item', '.slider__arrow_prev', '.slider__arrow_next');
	initSlider('.projects-section__slider', '.projects-section__list', '.project', '.slider__arrow_prev', '.slider__arrow_next');
});
