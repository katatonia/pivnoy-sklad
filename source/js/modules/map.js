export const createMap = () => {
    const pinTemplate = `
        <div class="map__pin" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;">
            <img src="icons/pin.svg" width="45" height="45" aria-hidden="true">

            </img>
        </div>
    `;

    function init() {
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

    window.ymaps.ready(init);
};
