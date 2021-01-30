import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { showPopup, closePopup } from './utils.js'

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
const profileFormElement = document.getElementById('editProfileForm');
const formAddNewElement = document.getElementById('addNewElementForm');

//карточки "из коробки"
const elementsTemplate = document.querySelector('#elements-template').content;










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
    newCard(newElement);
    closePopup(popupAddNewElement);
}

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
profileFormElement.addEventListener('submit', handleFormSubmitProfile);
formAddNewElement.addEventListener('submit', handleFormSubmitElement);

function formValidation(targetPopup) {
    const activeForm = targetPopup.querySelector('.popup__form');
    const validator = new FormValidator(config, activeForm);
    validator.enableValidation(config);
}

//открытие попапов
profileEditBtn.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
    showPopup(popupEditProfile);
    formValidation(popupEditProfile);
});

addElementBtn.addEventListener('click', () => {
    showPopup(popupAddNewElement);
    const addFormInputs = popupAddNewElement.querySelectorAll('.popup__input');
    addFormInputs.forEach((input) => {
        input.value = '';
    })
    formValidation(popupAddNewElement);
});

//вешаем слушатели закрытия на все попапы
popupList.forEach(setClosePopupListener);

//создание экземпляра карточки
function newCard(obj) {
    const card = new Card(obj, elementsTemplate, elementsList);
    const cardElement = card.assembleElement();
    //добавляем элемент в разметку
    card.addClone(cardElement);
}

//рендер карточек из коробки
initialCards.forEach((obj) => newCard(obj));