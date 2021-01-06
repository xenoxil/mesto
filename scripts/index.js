//Обьявляем переменные для обработки кликов
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popupEditProfile');
const closeBtnEdit = document.querySelector('.popup__closeBtnEdit');
const closeBtnAdd = document.querySelector('.popup__closeBtnAdd');
const closeBtnImage = document.querySelector('.popup__closeBtnImage');

const elementsList = document.querySelector('.elements');
const addElementBtn = document.querySelector('.profile__add-btn');
const popupAddNewElement = document.querySelector('.popupAddNewElement');
const popupImage = document.querySelector('.popupImage');
const popupImagePic = document.querySelector('.popup__image');
const popupElement = document.querySelector('.popup__element');




//обьявляем переменные для обработки инпутов
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('popup__profilename');
const inputTitle = document.getElementById('popup__profiletitle');
inputName.value = profileName.textContent;
inputTitle.value = profileTitle.textContent;
const popupLink = document.getElementById('popup__link');
const popupTitle = document.getElementById('popup__title');


//Переменные для функции handleFormSubmit(evt)
const formElement = document.getElementById('editProfileForm');
const formAddNewElement = document.getElementById('addNewElementForm');

//карточки "из коробки"
const elementsTemplate = document.querySelector('#elements-template').content;
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];






function showPopup(popup) {

    popup.classList.add('popup_status_opened');

}




function closePopup(popup) {
    popup.classList.remove('popup_status_opened');
}




// Находим форму в DOM

// Воспользуйтесь методом querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;


    closePopup(popupEditProfile);
}

function handleFormSubmitElement(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.    

    let newElement = {};
    newElement.link = popupLink.value;
    newElement.name = popupTitle.value;
    addElement(newElement);

    closePopup(popupAddNewElement);
}


function addElement(obj) {
    const userElement = elementsTemplate.cloneNode(true);
    const userElementImage = userElement.querySelector('.element__image');
    userElementImage.src = obj.link;
    userElement.querySelector('.element__title').textContent = obj.name;
    userElementImage.alt = obj.name;
    elementsList.prepend(userElement);
}






initialCards.forEach(addElement);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»




formElement.addEventListener('submit', handleFormSubmitProfile);
formAddNewElement.addEventListener('submit', handleFormSubmitElement);




profileEditBtn.addEventListener('click', () => {
    showPopup(popupEditProfile);
});

addElementBtn.addEventListener('click', () => {
    showPopup(popupAddNewElement);
});

closeBtnEdit.addEventListener('click', () => {
    closePopup(popupEditProfile)
});
closeBtnAdd.addEventListener('click', () => {
    closePopup(popupAddNewElement);
});

closeBtnImage.addEventListener('click', () => {
    closePopup(popupImage);
});

//делегируем лайки на родителя элементс
elementsList.addEventListener('click', function(evt) {
    const tar = evt.target;
    if (tar.classList.contains('element__likebtn')) {
        tar.classList.toggle('element__likebtn_active');
    }
});

//делегируем открытие картинок  на родителя элементс
elementsList.addEventListener('click', function(evt) {
    const tar = evt.target;
    if (tar.classList.contains('element__image')) {
        popupImagePic.src = tar.src;
        popupElement.textContent = tar.alt;
        showPopup(popupImage);
    }
});
//делегируем удаление на родителя элементс
elementsList.addEventListener('click', function(evt) {
    const tar = evt.target;
    if (tar.classList.contains('element__trashbtn') || tar.classList.contains('element__trashpic')) {
        tar.closest('.element').remove();
    }
});