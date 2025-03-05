import { toggleNavMenus } from './modules/toggle-nav-menus.js';
import { accordion } from './modules/accordion.js';
import { slider } from './modules/slider.js';

document.addEventListener("DOMContentLoaded", () => {
	toggleNavMenus();
	accordion();
	slider();
});
