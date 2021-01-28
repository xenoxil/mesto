import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

//конфиг
const config = {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submitbtn',
        inactiveButtonClass: 'popup__submitbtn_status_inactive',
        errorClass: '.popup__input_state_invalid'
    }
    //Обьявляем переменные для обработки кликов
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popupEditProfile');
const elementsList = document.querySelector('.elements');
const addElementBtn = document.querySelector('.profile__add-btn');
const popupAddNewElement = document.querySelector('.popupAddNewElement');
/*const popupImage = document.querySelector('.popupImage');
const popupImagePic = document.querySelector('.popup__image');
const popupElement = document.querySelector('.popup__element');*/
const popupList = document.querySelectorAll('.popup');

//обьявляем переменные для обработки инпутов
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('popup__profilename');
const inputTitle = document.getElementById('popup__profiletitle');
const popupLink = document.getElementById('popup__link');
const popupTitle = document.getElementById('popup__title');

//Переменные для функции handleFormSubmit(evt)
const formElement = document.getElementById('editProfileForm');
const formAddNewElement = document.getElementById('addNewElementForm');

//карточки "из коробки"
const elementsTemplate = document.querySelector('#elements-template').content;






//функция открытия попапов
export function showPopup(popup) {
    popup.classList.add('popup_status_opened');
    document.addEventListener('keydown', closeEsc);
}
//функция закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_status_opened');
    document.removeEventListener('keydown', closeEsc);

}


//отправка формы профайла
function handleFormSubmitProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;
    closePopup(popupEditProfile);
}

//отправка формы карточки
function handleFormSubmitElement(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    const newElement = {};
    newElement.link = popupLink.value;
    newElement.name = popupTitle.value;
    const card = new Card(newElement, elementsTemplate, elementsList);
    card.assembleElement();
    closePopup(popupAddNewElement);
}
//функция закрытия по Esc
function closeEsc(evt) {
    const targetPopup = document.querySelector('.popup_status_opened');
    if (targetPopup) {
        if (evt.key === 'Escape') {
            closePopup(targetPopup);
        }
    }
};
//функция добавления слушателя закрытия попапов по оверлею и кнопке закрыть
function setClosePopupListener(popup) {
    popup.addEventListener('click', (evt) => {
        const target = evt.target;
        if (target.classList.contains('popup') || target.classList.contains('popup__closebtn')) {
            closePopup(popup);
        }
    });
}

//функция подготовки новой ноды

//функция открытия попапа картинки
/*function openImage() {
    popupImagePic.src = elementImage.src;
    popupElement.textContent = elementImage.alt;
    showPopup(popupImage);
}*/

//вешаем сабмит на кнопки
formElement.addEventListener('submit', handleFormSubmitProfile);
formAddNewElement.addEventListener('submit', handleFormSubmitElement);

//открытие попапов
profileEditBtn.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
    showPopup(popupEditProfile);
    const activeForm = popupEditProfile.querySelector('.popup__form');
    const validator = new FormValidator(config, activeForm);
    validator.enableValidation(config);
});

addElementBtn.addEventListener('click', () => {
    showPopup(popupAddNewElement);
    const activeForm = popupAddNewElement.querySelector('.popup__form');
    const validator = new FormValidator(config, activeForm);
    validator.enableValidation(config);
});

//вешаем слушатели закрытия на все попапы
popupList.forEach(setClosePopupListener);