export const filter = () => {
    const filterButton = document.querySelector(".catalog__filter-button");
    const filterList = document.querySelector(".catalog__filter-list");
    const filterClose = document.querySelector(".catalog__filter-close");

    if (filterButton && filterList) {
        filterButton.addEventListener("click", () => {
            filterList.classList.toggle("catalog__filter-list_is-active");
        });
    }

    if (filterClose && filterList) {
        filterClose.addEventListener("click", () => {
            filterList.classList.remove("catalog__filter-list_is-active");
        });
    }

    document.querySelectorAll(".filter__header").forEach(header => {
        header.addEventListener("click", () => {
            document.querySelectorAll(".filter__content").forEach(content => {
                if (content !== header.nextElementSibling) {
                    content.style.display = "none";
                }
            });
            const content = header.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    document.querySelectorAll(".filter__content ul li").forEach(item => {
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

    document.querySelectorAll(".filter__content ul li input").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const filterContent = checkbox.closest(".filter__content");
            const filterHeader = filterContent ? filterContent.previousElementSibling : null;
            const selectedText = filterHeader ? filterHeader.querySelector(".filter__selected") : null;

            if (selectedText) {
                const selectedItems = Array.from(filterContent.querySelectorAll("input:checked"))
                    .map(el => el.parentElement.textContent.trim());
                selectedText.textContent = selectedItems.length > 0 ? selectedItems.join(", ") : "Выберите вариант";
            }
        });
    });
};
