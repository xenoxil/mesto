export default class Section {
    constructor(renderer, containerSelector) {
            this._renderer = renderer;
            this._container = containerSelector;

        }
        //принимает дом элемент и добавляет его в контейнер
    addItem(element) {

        this._container.prepend(element);

    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems(items) {
        this._clear();
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}