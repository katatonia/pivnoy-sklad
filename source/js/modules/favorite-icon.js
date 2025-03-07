export const toggleFavoriite = () => {
	const favoriteButton = document.querySelector('.product__favorite');
	const favoriteIcon = document.querySelector('.product__favorite-icon');

	favoriteButton.addEventListener('click', () => {
		favoriteIcon.classList.toggle('product__favorite-icon_is-active');
	})
}
