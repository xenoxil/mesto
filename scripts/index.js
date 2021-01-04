//Обьявляем переменные для обработки кликов
const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popupEditProfile');
const closeBtn = document.querySelector('.popup_closebtn');
const closeBtnEdit = document.querySelector('.popup_closeBtnEdit');
const closeBtnAdd = document.querySelector('.popup__closeBtnAdd');
const closeBtnImage = document.querySelector('.popup__closeBtnImage');
const popup = document.querySelector('.popup');
const elementsList = document.querySelector('.elements');
const addElementBtn = document.querySelector('.profile__add-btn');
const popupAddNewElement = document.querySelector('.popupAddNewElement');
const popupImage = document.querySelector('.popupImage');
const popup__image = document.querySelector('.popup__image');
const popup__element = document.querySelector('.popup__element');




//обьявляем переменные для обработки инпутов
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('popup__profilename');
const inputTitle = document.getElementById('popup__profiletitle');
inputName.value = profileName.textContent;
inputTitle.value = profileTitle.textContent;


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
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    const target = evt.currentTarget;
    const parent = target.closest('.popup');
    console.log(target.closest('.popup'));
    if (parent.classList.contains('popupEditProfile')) {
        profileName.textContent = inputName.value;
        profileTitle.textContent = inputTitle.value;
    }
    if (parent.classList.contains('popupAddNewElement')) {
        let newElement = {};
        newElement.link = popup__link.value;
        newElement.name = popup__title.value;
        addElement(newElement);

    }


    closePopup(parent);
}



function addElement(obj) {
    const userElement = elementsTemplate.cloneNode(true);
    userElement.querySelector('.element__image').src = obj.link;
    userElement.querySelector('.element__title').textContent = obj.name;
    userElement.querySelector('.element__image').alt = obj.name;
    elementsList.prepend(userElement);
}






initialCards.forEach(addElement);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»




formElement.addEventListener('submit', handleFormSubmit);
formAddNewElement.addEventListener('submit', handleFormSubmit);




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
        popup__image.src = tar.src;
        popup__element.textContent = tar.alt;
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