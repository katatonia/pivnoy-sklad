export const filter = () => {
    const filterButton = document.querySelector(".filter-nav__filter-button");
    const filterList = document.querySelector(".filter");
    const filterClose = document.querySelector(".filter__close");
    const overlay = document.querySelector(".catalog__overlay");

    const toggleFilter = (state) => {
        if (filterList && overlay) {
            filterList.classList.toggle("filter_is-active", state);
            overlay.classList.toggle("open", state);
        }
    };

    filterButton?.addEventListener("click", () => toggleFilter(true));
    filterClose?.addEventListener("click", () => toggleFilter(false));
    overlay?.addEventListener("click", () => toggleFilter(false));

    document.querySelectorAll(".filter-element__header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            document.querySelectorAll(".filter-element__content").forEach(el => {
                if (el !== content) el.style.display = "none";
            });
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
            const filterHeader = filterContent?.previousElementSibling;
            const selectedText = filterHeader?.querySelector(".filter-element__selected");

            if (selectedText) {
                const selectedItems = Array.from(filterContent.querySelectorAll("input:checked"))
                    .map(el => el.parentElement.textContent.trim());
                selectedText.textContent = selectedItems.length > 0 ? selectedItems.join(", ") : "Выберите вариант";
            }
        });
    });
};
