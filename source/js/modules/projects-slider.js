export const projectsSlider = () => {
	document.addEventListener("DOMContentLoaded", () => {
		const slider = document.querySelector(".projects__list");
		let isDown = false;
		let startX;
		let scrollLeft;

		slider.addEventListener("mousedown", (e) => {
			isDown = true;
			slider.classList.add("active");
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});

		slider.addEventListener("mouseleave", () => {
			isDown = false;
			slider.classList.remove("active");
		});

		slider.addEventListener("mouseup", () => {
			isDown = false;
			slider.classList.remove("active");
		});

		slider.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 1.5; // Скорость прокрутки
			slider.scrollLeft = scrollLeft - walk;
		});

		// Добавляем поддержку для мобильных устройств
		slider.addEventListener("touchstart", (e) => {
			isDown = true;
			startX = e.touches[0].pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});

		slider.addEventListener("touchend", () => {
			isDown = false;
		});

		slider.addEventListener("touchmove", (e) => {
			if (!isDown) return;
			const x = e.touches[0].pageX - slider.offsetLeft;
			const walk = (x - startX) * 1.5;
			slider.scrollLeft = scrollLeft - walk;
		});
	});
};
