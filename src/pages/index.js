import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../../utils/initialCards.js'
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
} from '../../utils/constants.js'

import './index.css'



const profileInfo = new UserInfo({
    nameSelector: profileName,
    titleSelector: profileTitle
});

const profilePopup = new PopupWithForm(popupEditProfile, (data) => {
    profileInfo.setUserInfo(data.profileName, data.profileTitle);
    profilePopup.close();
});
profilePopup.setEventListeners();
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function newCard(item) {
    const card = new Card(item, elementsTemplate, () => {
        popupWithImage.open(item);
    })
    return card;
}

const cardList = new Section({
        items: initialCards,
        renderer: function(item) {
            cardList.addItem(newCard(item).assembleElement())
        }
    },
    elementsList)
cardList.renderItems()

//создаём валидатор профайла
const profileForm = popupEditProfile.querySelector('.popup__form');
const profileValidator = new FormValidator(config, profileForm);
profileValidator.enableValidation();
//открытие попапов
profileEditBtn.addEventListener('click', () => {
    const userData = profileInfo.getUserInfo();
    profilePopup.open();
    inputName.value = userData.name;
    inputTitle.value = userData.title;
});
//создаём валидатор попапа(добавление карточки)
const elementForm = popupAddNewElement.querySelector('.popup__form');
const elementValidator = new FormValidator(config, elementForm);
elementValidator.enableValidation();

//создаём экземпляр класса попапа(добавление карточки)
const elementPopup = new PopupWithForm(popupAddNewElement, () => {
    const newElement = {};
    newElement.link = popupLink.value;
    newElement.name = popupTitle.value;
    console.log(newElement);

    cardList.addItem(newCard(newElement).assembleElement());
    elementPopup.close();
})
elementPopup.setEventListeners();
addElementBtn.addEventListener('click', () => {
    elementPopup.open();

});