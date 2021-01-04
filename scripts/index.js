//Обьявляем переменные для обработки кликов
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupEditProfile = document.querySelector('.popupEditProfile');
let closeBtn = document.querySelector('.popup_closebtn');
let closeBtnEdit = document.querySelector('.popup_closeBtnEdit');
let closeBtnAdd = document.querySelector('.popup__closeBtnAdd');
let popup = document.querySelector('.popup');
const elementsList = document.querySelector('.elements');
const addElementBtn = document.querySelector('.profile__add-btn');
const popupAddNewElement = document.querySelector('.popupAddNewElement')




//обьявляем переменные для обработки инпутов
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('popup__profilename');
const inputTitle = document.getElementById('popup__profiletitle');
inputName.value = profileName.textContent;
inputTitle.value = profileTitle.textContent;


//Переменные для функции handleFormSubmit(evt)
let formElement = document.getElementById('editProfileForm');
let formAddNewElement = document.getElementById('addNewElementForm');

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

//делегируем лайки на родителя элементс
elementsList.addEventListener('click', function(evt) {
    const tar = evt.target;
    if (tar.classList.contains('element__likebtn')) {
        tar.classList.toggle('element__likebtn_active');
    }
});
//делегируем удаление на родителя элементс
elementsList.addEventListener('click', function(evt) {
    const tar = evt.target;
    if (tar.classList.contains('element__trashbtn') || tar.classList.contains('element__trashpic')) {
        tar.closest('.element').remove();
    }
});