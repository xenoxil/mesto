import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api.js'
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import {
    avatarPic,
    avatarLink,
    popupChangeAvatar,
    proccessingText,
    yesText,
    avatarEditBtn,
    popupImage,
    config,
    popupDeleteConfirmation,
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
    elementsTemplate,
    saveProccess,
    saveText
} from '../../utils/constants.js'

import './index.css'
const devId = 'a85e8d4d0d4da73dec474d6c';
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
        authorization: '3e3e985a-d38c-43c5-bc4d-448c0a0fa2a7',
        'Content-Type': 'application/json'
    }
});

api.getInfo()
    .then(([cardArray, { name, about, _id, avatar }]) => {
        /*devId = _id;*/
        profileInfo.setUserInfo({ name, about, _id, avatar })
        profileInfo.updateUserInfo();
        cardList.renderItems(cardArray);
    })


const cardList = new Section(
    function(item) {
        cardList.addItem(newCard(item).assembleElement())
    },
    elementsList)

const deleteConfirmationPopup = new PopupWithSubmit(popupDeleteConfirmation);
deleteConfirmationPopup.setEventListeners();


const profileInfo = new UserInfo({
    nameSelector: profileName,
    titleSelector: profileTitle,
    avatarSelector: avatarPic
});

const profilePopup = new PopupWithForm(popupEditProfile, (data) => {
    profilePopup.renderLoading(true, saveProccess, saveText);
    api.editProfile(data.profileName, data.profileTitle)
        .then((res) => {
            profileInfo.setUserInfo(res);
            profileInfo.updateUserInfo();
            profilePopup.close();
            return res.json();
        })
        .finally((res) => {
            profilePopup.renderLoading(false, saveProccess, saveText)
        })
});
profilePopup.setEventListeners();
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function newCard(item) {
    const card = new Card(item, elementsTemplate,
        () => {
            popupWithImage.open(item);
        },

        () => {
            deleteConfirmationPopup.setSubmitBehaviour(() => {
                deleteConfirmationPopup.renderLoading(true, proccessingText, yesText);
                debugger;
                api.deleteCard(card.getCardId())
                    .then(res => {
                        card.deleteElement();
                        return Promise.resolve(`Карточка успешно удалена`)
                    })
                deleteConfirmationPopup.renderLoading(false, proccessingText, yesText);
                deleteConfirmationPopup.close();
            })
            deleteConfirmationPopup.open();
        },
        () => {

            if (card.isLiked()) {
                api.removeLike(card.getCardId())
                    .then((res) => {
                        card.updateLikes(res);
                    })
                    .finally(card._likeBtn.classList.remove('element__likebtn_active'))
            } else {
                api.sendLike(card.getCardId())
                    .then((res) => {
                        card.updateLikes(res);
                    })
                    .finally(card._likeBtn.classList.add('element__likebtn_active'))
            }
        }, devId
    )
    return card;

}


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
    newElement.owner = {};
    newElement.owner._id = profileInfo._id;
    newElement.owner.name = profileInfo.name;
    newElement.owner.about = profileInfo.title;
    newElement.likes = '';

    api.sendElement(newElement)
        .then((res) => {
            cardList.addItem(newCard(newElement).assembleElement());
        })
    elementPopup.close();
})
elementPopup.setEventListeners();
addElementBtn.addEventListener('click', () => {
    elementPopup.open();

});
//создаём валидатор попапа(добавление карточки)
const avatarForm = popupChangeAvatar.querySelector('.popup__form');
const avatarValidator = new FormValidator(config, avatarForm);
avatarValidator.enableValidation();
//создаём экземпляр класса попапа(замена аватара)
const avatarPopup = new PopupWithForm(popupChangeAvatar, () => {
    api.changeAvatarIcon(avatarLink.value)
        .then((res) => {
            avatarPic.src = res.avatar;
        })
    avatarPopup.close();
})
avatarPopup.setEventListeners();
avatarEditBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    avatarPopup.open()
})