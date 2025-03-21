export const cartSidebar = () => {
    const cartSidebar = document.querySelector(".cart-sidebar");
    const cartClose = document.querySelector(".cart-sidebar__close");
    const cartIcon = document.querySelector(".sticky-cart");
    const overlay = document.querySelector(".overlay");

    if (!cartSidebar || !cartIcon || !cartClose || !overlay) {
        return;
    }

    // Открытие корзины
    cartIcon.addEventListener("click", function () {
        cartSidebar.classList.add("open");
        overlay.classList.add("open");
        document.body.classList.add("scroll-lock");
    });

    // Закрытие корзины
    cartClose.addEventListener("click", closeCart);
    overlay.addEventListener("click", closeCart);

    function closeCart() {
        cartSidebar.classList.remove("open");
        overlay.classList.remove("open");
        document.body.classList.remove("scroll-lock");
    }
};
