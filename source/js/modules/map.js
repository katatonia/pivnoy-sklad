export const createMap = () => {
    // Проверяем, существует ли объект ymaps в глобальной области видимости
    if (typeof window.ymaps === 'undefined') {
        return;
    }

    const pinTemplate = `
        <div class="map__pin" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;">
            <img src="icons/logo_base.svg" width="45" height="45" aria-hidden="true">
            </img>
        </div>
    `;

    function init() {
        if (!window.ymaps.Map) {
            return;
        }

        let map = new window.ymaps.Map('map', {
            center: [59.954919, 30.373010],
            zoom: 16,
            controls: [],
            behaviors: ['drag', 'multiTouch'],
        });

        map.controls.add('zoomControl', {
            size: 'auto',
            position: { right: 10, top: 10 },
        });

        // Проверяем, загружена ли фабрика шаблонов
        if (!window.ymaps.templateLayoutFactory) {
            console.error('ymaps.templateLayoutFactory не доступен.');
            return;
        }

        // Создаем кастомный макет метки
        const PlacemarkLayout = window.ymaps.templateLayoutFactory.createClass(pinTemplate);

        // Создаем метку с кастомным макетом
        const placemark = new window.ymaps.Placemark(
            [59.954919, 30.373010],
            {},
            {
                iconLayout: PlacemarkLayout, // Кастомный шаблон
                iconShape: { type: 'Circle', coordinates: [0, 0], radius: 22 }, // Форма кликабельной области
                zIndex: 100,
                iconOffset: [-22, -50]
            }
        );

        map.geoObjects.add(placemark);
    }

    // Проверяем, доступен ли ymaps.ready
    if (typeof window.ymaps.ready === 'function') {
        window.ymaps.ready(init);
    } else {
        console.error('ymaps.ready не является функцией.');
    }
};
