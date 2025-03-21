export const hamburger = () => {
    const nav = document.querySelector(".nav");
    const hamburgerItem = document.querySelector(".nav-icons__item_hamburger");
    const hamburger = document.querySelector(".nav-icons__link_hamburger");
    const closeIcon = document.querySelector(".nav__close");
    const linkTitle = document.querySelector(".nav-icons__link_title");
    const overlay = document.querySelector(".overlay"); // Добавление overlay

    if (!nav || !hamburgerItem || !hamburger || !closeIcon || !linkTitle || !overlay) return;

    let lastScrollPosition = window.scrollY;
    let isMouseOverNav = false;

    // Функция открытия nav
    const openNav = () => {
        nav.classList.add("nav_is-open");
        document.body.classList.add("scroll-lock");

        if (window.innerWidth < 1200) {
            overlay.classList.add("open");  // Показываем overlay только на мобильных
            hamburger.style.display = "none";
            closeIcon.style.display = "block";
            linkTitle.style.display = "none";
        }
    };

    // Функция закрытия nav
    const closeNav = () => {
        if (!isMouseOverNav) {
            nav.classList.remove("nav_is-open");
            document.body.classList.remove("scroll-lock");

            if (window.innerWidth < 1200) {
                overlay.classList.remove("open"); // Скрываем overlay только на мобильных
                hamburger.style.display = "block";
                closeIcon.style.display = "none";
                linkTitle.style.display = "none";
            }
        }
    };

    // Функция переключения nav
    const toggleMenu = () => {
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
            hamburger.style.display = "none";
            closeIcon.style.display = "none";
            linkTitle.style.display = "flex";
        } else {
            hamburger.style.display = "block";
            closeIcon.style.display = "none";
            linkTitle.style.display = "none";
        }
    };

    // Hover-логика для десктопа
    const handleHover = () => {
        if (window.innerWidth >= 1200) {
            openNav();
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 1200) {
            isMouseOverNav = false;
            closeNav();
        }
    };

    const handleMouseEnter = () => {
        if (window.innerWidth >= 1200) {
            isMouseOverNav = true;
        }
    };

    // Закрытие меню при прокрутке страницы (только для десктопа)
    const handleScroll = () => {
        const currentScrollPosition = window.scrollY;
        if (Math.abs(currentScrollPosition - lastScrollPosition) > 5 && window.innerWidth >= 1200) {
            closeNav();
        }
        lastScrollPosition = currentScrollPosition;
    };

    // Слушатели событий
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    hamburger.addEventListener("click", toggleMenu);
    closeIcon.addEventListener("click", closeNav);
    overlay.addEventListener("click", closeNav); // Закрытие по клику на overlay

    // Hover для десктопа
    hamburgerItem.addEventListener("mouseenter", handleHover);
    nav.addEventListener("mouseenter", handleMouseEnter);
    nav.addEventListener("mouseleave", handleMouseLeave);

    // Первоначальная настройка при загрузке страницы
    handleResize();
};

