export const accordion = () => {
	const menuTitle = document.querySelector(".menu__title");
	const menuList = document.querySelector(".menu__list");

	menuTitle.addEventListener("click", function () {
		menuList.classList.toggle('menu__list_is-open');
	});
};
