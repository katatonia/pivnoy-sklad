export const toggleNavMenus = () => {
    const nav = document.querySelector(".nav");
    const hamburger = document.querySelector(".nav-icons__item_hamburger");
    const closeIcon = document.querySelector(".nav__close");
    const overlay = document.querySelector(".overlay");

    if (!nav || !hamburger || !closeIcon || !overlay) return;

    // Функция открытия nav
    const openNav = () => {
        nav.classList.add("nav_is-open");
        overlay.classList.add("open");
        document.body.classList.add("scroll-lock");

        if (window.innerWidth < 1200) {
            hamburger.style.display = "none";
            closeIcon.style.display = "block";
        }
    };

    // Функция закрытия nav
    const closeNav = () => {
        nav.classList.remove("nav_is-open");
        overlay.classList.remove("open");
        document.body.classList.remove("scroll-lock");

        if (window.innerWidth < 1200) {
            hamburger.style.display = "block";
            closeIcon.style.display = "none";
        }
    };

    // Функция переключения nav
    const toggleMenu = () => {
        if (window.innerWidth >= 1200) return;

        if (nav.classList.contains("nav_is-open")) {
            closeNav();
        } else {
            openNav();
        }
    };

    // Закрытие меню при изменении размера экрана
    const handleResize = () => {
        if (window.innerWidth >= 1200) {
            closeNav();
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

    // Закрытие nav при клике на overlay
    overlay.addEventListener("click", closeNav);

    // Слушатели событий
    window.addEventListener("resize", handleResize);
    hamburger.addEventListener("click", toggleMenu);
    closeIcon.addEventListener("click", closeNav);
    hamburger.addEventListener("mouseenter", handleHover);
    nav.addEventListener("mouseenter", handleHover);
    hamburger.addEventListener("mouseleave", handleMouseLeave);
    nav.addEventListener("mouseleave", handleMouseLeave);
};
