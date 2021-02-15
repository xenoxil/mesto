export const popupImage = document.querySelector('.popupImage');

export const EscBtn = 'Escape';
//конфиг
export const config = {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submitbtn',
        inactiveButtonClass: 'popup__submitbtn_status_inactive',
        errorClass: '.popup__input_state_invalid'
    }
    //Обьявляем переменные для обработки кликов
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const popupEditProfile = document.querySelector('.popupEditProfile');
export const elementsList = document.querySelector('.elements');
export const addElementBtn = document.querySelector('.profile__add-btn');
export const popupAddNewElement = document.querySelector('.popupAddNewElement');

//обьявляем переменные для обработки инпутов
export const profileName = document.querySelector('.profile__name');
export const profileTitle = document.querySelector('.profile__title');
export const inputName = document.getElementById('popup__profilename');
export const inputTitle = document.getElementById('popup__profiletitle');
export const popupLink = document.getElementById('popup__link');
export const popupTitle = document.getElementById('popup__title');

//темплейт карточки
export const elementsTemplate = document.querySelector('#elements-template').content;