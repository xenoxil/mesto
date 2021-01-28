const elementsTemplate = document.querySelector('#elements-template').content;
const elementsList = document.querySelector('.elements');
const popupImage = document.querySelector('.popupImage');
const popupImagePic = document.querySelector('.popup__image');
const popupElement = document.querySelector('.popup__element');
import { showPopup } from './index.js'
export class Card {
    constructor(obj, template, parent) {
        this._obj = obj;
        this._template = template;
        this._parent = parent;
    }
    _returnElement() {
            const userElement = this._template.cloneNode(true);
            const userElementImage = userElement.querySelector('.element__image');
            userElementImage.src = this._obj.link;
            userElement.querySelector('.element__title').textContent = this._obj.name;
            userElementImage.alt = this._obj.name;
            return userElement;
        }
        //функция добавления ноды в разметку. 
    _addClone(userElement) {
        this._parent.prepend(userElement);
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

        function openImage() {
            popupImagePic.src = elementImage.src;
            popupElement.textContent = elementImage.alt;
            showPopup(popupImage);
        }

        //функция удаления элемента
        function deleteElement() {
            likeBtn.removeEventListener('click', likeListener);
            elementImage.removeEventListener('click', openImage);
            deleteBtn.removeEventListener('click', deleteElement);
            deleteBtn.closest('.element').remove();
        }

        //вешаем обработчики
        likeBtn.addEventListener('click', likeListener);
        elementImage.addEventListener('click', openImage);
        deleteBtn.addEventListener('click', deleteElement);
        //добавляем элемент в разметку
        this._addClone(element);
    }
}




//рендер карточек из коробки
initialCards.forEach((obj) => {
    const card = new Card(obj, elementsTemplate, elementsList);
    const cardElement = card.assembleElement();
})