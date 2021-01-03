//Обьявляем переменные для обработки кликов
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__closebtn');


//обьявляем переменные для обработки инпутов
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('popup__profilename');
const inputTitle = document.getElementById('popup__profiletitle');

//Переменные для функции handleFormSubmit(evt)
let formElement = document.querySelector('.popup__container');

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






function showPopup() {
    popup.classList.add('popup_status_opened');
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
}


function closePopup() {
    popup.classList.remove('popup_status_opened');
}

function clickLike(event) {
    event.target.classList.toogle('element__likebtn_active');
}


// Находим форму в DOM

// Воспользуйтесь методом querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.    
    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;
    closePopup();
}

function addElement(obj) {
    const userElement = elementsTemplate.cloneNode(true);
    const elementsList = document.querySelector('.elements')
    userElement.querySelector('.element__image').src = obj.link;
    userElement.querySelector('.element__title').textContent = obj.name;
    userElement.querySelector('.element__likebtn').addEventListener('click', clickLike);

    elementsList.append(userElement);
}
initialCards.forEach(addElement);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

profileEditBtn.addEventListener('click', showPopup);

closeBtn.addEventListener('click', closePopup);