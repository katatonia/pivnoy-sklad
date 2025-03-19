export const cartSidebar = () => {
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartClose = document.querySelector(".cart-sidebar__close");
    const cartIcon = document.querySelector(".nav-icons__item_basket");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!cartSidebar || !cartIcon || !cartClose || !overlay) {
        console.error("Один из элементов не найден!");
        return;
    }

    console.log("Скрипт загрузился корректно");

    // Открытие корзины
    cartIcon.addEventListener("click", function () {
        console.log("Клик по иконке корзины");
        cartSidebar.classList.add("open");
        overlay.classList.add("open");
        body.classList.add("scroll-lock");
    });

    // Закрытие корзины
    cartClose.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);

    function closeCart() {
        console.log("Закрытие корзины");
        cartSidebar.classList.remove("open");
        overlay.classList.remove("open");
        body.classList.remove("scroll-lock");
    }
};
