export const toggleNavMenus = () => {
	const nav = document.querySelector(".nav");
	const hamburger = document.querySelector(".nav-icons__item_hamburger");
	const cancel = document.querySelector(".nav-icons__item_cancel");
	const orders = document.querySelector(".orders");
	const ordersIcon = document.querySelector(".nav-icons__item_orders");
	const ordersButton = document.querySelector(".orders__button");

	if (!nav || !hamburger || !cancel || !orders || !ordersIcon || !ordersButton) return;

	const updateBodyScrollLock = () => {
		if (nav.classList.contains("nav_is-open") || orders.classList.contains("orders_is-open")) {
			document.body.classList.add("scroll-lock");
		} else {
			document.body.classList.remove("scroll-lock");
		}
	};

	// Закрытие nav
	const closeNav = () => {
		nav.classList.remove("nav_is-open");
		updateBodyScrollLock();

		if (window.innerWidth < 1200) {
			hamburger.style.display = "block";
			cancel.style.display = "none";
		} else {
			hamburger.style.removeProperty("display");
			cancel.style.removeProperty("display");
		}
	};

	// Закрытие orders
	const closeOrders = () => {
		orders.classList.remove("orders_is-open");
		updateBodyScrollLock();

		if (window.innerWidth < 1200 && nav.classList.contains("nav_is-open")) {
			hamburger.style.display = "none";
			cancel.style.display = "block";
		}
	};

	// Переключение nav
	const toggleMenu = () => {
		if (window.innerWidth >= 1200) return;

		const isOpen = nav.classList.contains("nav_is-open");
		closeNav();

		if (!isOpen) {
			nav.classList.add("nav_is-open");

			if (window.innerWidth < 1200) {
				hamburger.style.display = "none";
				cancel.style.display = "block";
			}
		}

		if (orders.classList.contains("orders_is-open")) {
			closeOrders();
		}
		updateBodyScrollLock();
	};

	// Переключение orders
	const toggleOrders = () => {
		const isOrdersOpen = orders.classList.contains("orders_is-open");

		if (!isOrdersOpen) {
			closeNav();
			orders.classList.add("orders_is-open");

			if (window.innerWidth < 1200) {
				hamburger.style.display = "block";
				cancel.style.display = "none";
			}
		} else {
			closeOrders();
		}
		updateBodyScrollLock();
	};

	// Закрытие всех меню при изменении размера экрана
	const handleResize = () => {
		if (window.innerWidth >= 1200) {
			closeNav();
			closeOrders();
		}
	};

	// Hover-логика для десктопа
	const handleHover = () => {
		if (window.innerWidth >= 1200) {
			nav.classList.add("nav_is-open");
		}
	};

	const handleMouseLeave = (event) => {
		if (window.innerWidth >= 1200 && !nav.contains(event.relatedTarget) && !hamburger.contains(event.relatedTarget)) {
			nav.classList.remove("nav_is-open");
		}
	};

	// Предотвращение закрытия при клике внутри меню
	const preventContextMenuClose = (event) => {
		if (nav.contains(event.target)) {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	// Слушатели событий
	window.addEventListener("resize", handleResize);
	hamburger.addEventListener("click", toggleMenu);
	cancel.addEventListener("click", toggleMenu);
	ordersIcon.addEventListener("click", toggleOrders);
	ordersButton.addEventListener("click", closeOrders);
	orders.addEventListener("click", (event) => event.stopPropagation());
	hamburger.addEventListener("mouseenter", handleHover);
	nav.addEventListener("mouseenter", handleHover);
	hamburger.addEventListener("mouseleave", handleMouseLeave);
	nav.addEventListener("mouseleave", handleMouseLeave);
	nav.addEventListener("contextmenu", preventContextMenuClose);
};
