export const toggleFavorite = () => {
    document.querySelectorAll(".favorite").forEach(favoriteButton => {
        favoriteButton.addEventListener("click", () => {
            const favoriteIcon = favoriteButton.querySelector(".favorite__icon");
            if (favoriteIcon) {
                favoriteIcon.classList.toggle("favorite__icon_is-active");
            }
        });
    });
};
