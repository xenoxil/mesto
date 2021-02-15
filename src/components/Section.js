export default class Section {
    constructor({ items, renderer }, containerSelector) {
            this._renderer = renderer;
            this._container = containerSelector;
            this._items = items;
        }
        //принимает дом элемент и добавляет его в контейнер
    addItem(element) {

        this._container.prepend(element);

    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._clear();

        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}