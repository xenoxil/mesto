export class Card {
    constructor(obj, template, handleCardClick) {
        this._obj = obj;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }
    _returnElement() {
        const userElement = this._template.cloneNode(true);
        const userElementImage = userElement.querySelector('.element__image');
        userElementImage.src = this._obj.link;
        userElement.querySelector('.element__title').textContent = this._obj.name;
        userElementImage.alt = this._obj.name;
        return userElement;
    }

    //функция сбора карточки с добавлением слушателей
    assembleElement() {
        //ищем нужные кнопки в карточке
        const element = this._returnElement(this._obj, this._template);
        const likeBtn = element.querySelector('.element__likebtn');
        const elementImage = element.querySelector('.element__image');
        const deleteBtn = element.querySelector('.element__trashbtn');
        //функция слушателя лайков
        function likeListener() {
            likeBtn.classList.toggle('element__likebtn_active');
        }

        //функция удаления элемента
        function deleteElement() {
            likeBtn.removeEventListener('click', likeListener);
            elementImage.removeEventListener('click', this._handleCardClick);
            deleteBtn.removeEventListener('click', deleteElement);
            deleteBtn.closest('.element').remove();
        }

        //вешаем обработчики
        likeBtn.addEventListener('click', likeListener);
        elementImage.addEventListener('click', this._handleCardClick);
        deleteBtn.addEventListener('click', deleteElement);
        /*//добавляем элемент в разметку
        this._addClone(element);*/
        return element;
    }
}