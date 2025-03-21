import { hamburger } from './modules/hamburger.js';
import { initSlider } from './modules/slider.js';
import { createMap } from './modules/map.js';
import { toggleFavorite } from './modules/favorite.js';
import { counter } from './modules/counter.js';
import { filter } from './modules/filter.js';
import { select } from './modules/select.js';
import { cartSidebar } from './modules/cart-sidebar.js';
import { projectsSlider } from './modules/projects-slider.js';
import { cartModal } from './modules/cart-modal.js';
import { catalogPagination } from './modules/pagination.js';

document.addEventListener("DOMContentLoaded", () => {
	hamburger();
	createMap();
	toggleFavorite();
	counter();
	filter();
	select();
	cartSidebar();
	projectsSlider();
	cartModal();
	catalogPagination();

	initSlider('.new__slider', '.slider__list', '.slider__item', '.slider__button_prev', '.slider__button_next');
	initSlider('.leaders__slider', '.slider__list', '.slider__item', '.slider__button_prev', '.slider__button_next');
});
