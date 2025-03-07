export const counter = () => {
	const counters = document.querySelectorAll(".counter");

	counters.forEach(counter => {
		const minusBtn = counter.querySelector(".counter__minus");
		const plusBtn = counter.querySelector(".counter__plus");
		const numberEl = counter.querySelector(".counter__number");
		const resultEl = counter.querySelector(".counter__result");

		let count = parseInt(numberEl.textContent);
		let basePrice = parseInt(resultEl.textContent.replace(/\D/g, "")); // Извлекаем число из строки
		let currentPrice = basePrice; // Текущее значение цены

		function updateCounter() {
			numberEl.textContent = count;
			resultEl.textContent = `${currentPrice} ₽`;
		}

		minusBtn.addEventListener("click", () => {
			if (count > 1) {
				count--;
				currentPrice -= basePrice;
				updateCounter();
			}
		});

		plusBtn.addEventListener("click", () => {
			count++;
			currentPrice += basePrice;
			updateCounter();
		});

		updateCounter();
	});
};
