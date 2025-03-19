export const filter = () => {
    const filterButton = document.querySelector(".filter-nav__button");
    const filterList = document.querySelector(".filter");
    const filterClose = document.querySelector(".filter__close");
	const overlay = document.querySelector(".overlay");

    if (filterButton && filterList) {
        filterButton.addEventListener("click", () => {
            filterList.classList.toggle("filter_is-active");
			overlay.classList.add("open");
        });
    }

    if (filterClose && filterList) {
        filterClose.addEventListener("click", () => {
            filterList.classList.remove("filter_is-active");
			overlay.classList.remove("open");
        });
    }

    document.querySelectorAll(".filter-element__header").forEach(header => {
        header.addEventListener("click", () => {
            document.querySelectorAll(".filter-element__content").forEach(content => {
                if (content !== header.nextElementSibling) {
                    content.style.display = "none";
                }
            });
            const content = header.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    document.querySelectorAll(".filter-element__content ul li").forEach(item => {
        item.addEventListener("click", event => {
            if (!event.target.matches("input")) {
                const checkbox = item.querySelector("input");
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event("change"));
                }
            }
        });
    });

    document.querySelectorAll(".filter-element__content ul li input").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const filterContent = checkbox.closest(".filter-element__content");
            const filterHeader = filterContent ? filterContent.previousElementSibling : null;
            const selectedText = filterHeader ? filterHeader.querySelector(".filter-element__selected") : null;

            if (selectedText) {
                const selectedItems = Array.from(filterContent.querySelectorAll("input:checked"))
                    .map(el => el.parentElement.textContent.trim());
                selectedText.textContent = selectedItems.length > 0 ? selectedItems.join(", ") : "Выберите вариант";
            }
        });
    });
};
