export const accordion = () => {
	const menuTitle = document.querySelector(".menu__title");
	const menuList = document.querySelector(".menu__list");
	const menuArrow = document.querySelector(".menu__arrow");

	const updateBodyScrollLock = () => {
		if (nav.classList.contains("nav_is-open") || orders.classList.contains("orders_is-open")) {
			document.body.classList.add("scroll-lock");
		} else {
			document.body.classList.remove("scroll-lock");
		}
	};

	menuTitle.addEventListener("click", function () {
		menuList.classList.toggle('menu__list_is-open');
		menuArrow.classList.toggle('menu__arrow_is-open');
		updateBodyScrollLock();
	});
};
