import { showPopup, popupImage, popupImagePic, popupElement } from './utils.js'
export class Card {
    constructor(obj, template, parent) {
        this._obj = obj;
        this._template = template;
        this._parent = parent;
    }
    _returnElement() {
            const userElement = this._template.querySelector('.element').cloneNode(true);
            const userElementImage = userElement.querySelector('.element__image');
            userElementImage.src = this._obj.link;
            userElement.querySelector('.element__title').textContent = this._obj.name;
            userElementImage.alt = this._obj.name;
            return userElement;
        }
        //функция добавления ноды в разметку. 
    addClone(userElement) {
        this._parent.prepend(userElement);
    }


    //функция сбора карточки с добавлением слушателей
    assembleElement() {
        //ищем нужные кнопки в карточке
        this._element = this._returnElement(this._obj, this._template);
        const element = this._element;
        const likeBtn = this._element.querySelector('.element__likebtn');
        const elementImage = this._element.querySelector('.element__image');
        const deleteBtn = this._element.querySelector('.element__trashbtn');
        //функция слушателя лайков
        function likeListener() {
            likeBtn.classList.toggle('element__likebtn_active');
        }

        function openImage() {
            popupImagePic.src = elementImage.src;
            popupElement.textContent = elementImage.alt;
            showPopup(popupImage);
        }

        //функция удаления элемента
        function deleteElement() {
            this._element = element;
            this._element.remove();
            console.log(this._element);
        }

        //вешаем обработчики
        likeBtn.addEventListener('click', likeListener);
        elementImage.addEventListener('click', openImage);
        deleteBtn.addEventListener('click', deleteElement);

        return this._element;
    }
}