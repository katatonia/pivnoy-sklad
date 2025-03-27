export const counter = () => {
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const minusBtn = counter.querySelector(".counter__minus");
        const plusBtn = counter.querySelector(".counter__plus");
        const numberEl = counter.querySelector(".counter__number");
        const resultEl = counter.querySelector(".counter__result");

        let count = 1; // Начальное значение 1
        let basePrice = parseInt(resultEl.textContent.replace(/\D/g, ""));
        let currentPrice = basePrice; // Текущее значение цены

        numberEl.value = count; // Устанавливаем значение input на 1

        function updateCounter() {
            numberEl.value = count;
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
