import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../components/initialCards.js'
import {
    popupImage,
    config,
    profileEditBtn,
    popupEditProfile,
    elementsList,
    addElementBtn,
    popupAddNewElement,
    profileName,
    profileTitle,
    inputName,
    inputTitle,
    popupLink,
    popupTitle,
    elementsTemplate
} from '../components/constants.js'

import './index.css'


const profileInfo = new UserInfo({
    nameSelector: profileName,
    titleSelector: profileTitle
});

const profilePopup = new PopupWithForm(popupEditProfile, () => {

    profileInfo.setUserInfo(inputName.value, inputTitle.value);
    profileName.textContent = profileInfo.getUserInfo().name;
    profileTitle.textContent = profileInfo.getUserInfo().title;
    profilePopup.close();
});
const popupWithImage = new PopupWithImage(popupImage);
profilePopup.setEventListeners();


const cardList = new Section({
        items: initialCards,
        renderer: function(item) {
            const card = new Card(item, elementsTemplate, () => {
                const image = popupImage.querySelector('.popup__image');
                image.src = item.link;
                image.alt = item.name;
                popupWithImage.open(image);
            })
            this._container.prepend(card.assembleElement());
        }
    },
    elementsList)
cardList.renderItems()

//создаём валидатор профайла
const profileForm = popupEditProfile.querySelector('.popup__form');
const profileValidator = new FormValidator(config, profileForm);
profileValidator.enableValidation(config);
//открытие попапов
profileEditBtn.addEventListener('click', () => {
    profilePopup.open();
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
});
//создаём валидатор попапа(добавление карточки)
const elementForm = popupAddNewElement.querySelector('.popup__form');
const elementValidator = new FormValidator(config, elementForm);
elementValidator.enableValidation(config);

//создаём экземпляр класса попапа(добавление карточки)
const elementPopup = new PopupWithForm(popupAddNewElement, () => {
    const newElement = {};
    newElement.link = popupLink.value;
    newElement.name = popupTitle.value;
    const newItem = new Card(newElement, elementsTemplate, () => {
        const image = popupImage.querySelector('.popup__image');
        image.src = item.link;
        image.alt = item.name;
        popupWithImage.open(image);
    })

    cardList.addItem(newItem.assembleElement())
    elementPopup.close();
    elementPopup.reset();
})
elementPopup.setEventListeners();
addElementBtn.addEventListener('click', () => {
    elementPopup.open();

});