export const filter = () => {
    const filterButton = document.querySelector(".filter-nav__filter-button");
    const filterList = document.querySelector(".filter");
    const filterClose = document.querySelector(".filter__close");
    const overlay = document.querySelector(".catalog__overlay");
    const selectedFiltersContainer = document.querySelector(".catalog__selected-filters");

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
            const labelText = checkbox.parentElement.textContent.trim();

            if (selectedText) {
                const selectedItems = Array.from(filterContent.querySelectorAll("input:checked"))
                    .map(el => el.parentElement.textContent.trim());
                selectedText.textContent = selectedItems.length > 0 ? selectedItems.join(", ") : "Выберите вариант";
            }

            if (checkbox.checked) {
                const filterItem = document.createElement("li");
                filterItem.classList.add("catalog__selected-filters-item");
                filterItem.innerHTML = `${labelText}
                    <svg width="24" height="24">
                        <use xlink:href="icons/sprite.svg#cancel"></use>
                    </svg>`;

                filterItem.dataset.filterName = labelText;
                selectedFiltersContainer.appendChild(filterItem);

                const cancelBtn = filterItem.querySelector("svg");
                cancelBtn.addEventListener("click", () => {
                    const correspondingItem = Array.from(document.querySelectorAll(".filter-element__content ul li"))
                        .find(li => li.textContent.trim() === labelText);

                    if (correspondingItem) {
                        const correspondingCheckbox = correspondingItem.querySelector("input");
                        if (correspondingCheckbox && correspondingCheckbox.checked) {
                            correspondingCheckbox.checked = false;
                            correspondingCheckbox.dispatchEvent(new Event("change"));
                        }
                    }

                    filterItem.remove();
                });

            } else {
                const existingItem = selectedFiltersContainer.querySelector(`[data-filter-name="${labelText}"]`);
                if (existingItem) {
                    existingItem.remove();
                }
            }
        });
    });
};
