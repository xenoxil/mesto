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
const popupList = document.querySelectorAll('.popup');

//обьявляем переменные для обработки инпутов
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.getElementById('popup__profilename');
const inputTitle = document.getElementById('popup__profiletitle');
inputName.value = profileName.textContent;
inputTitle.value = profileTitle.textContent;
const popupLink = document.getElementById('popup__link');
const popupTitle = document.getElementById('popup__title');
let times = 0;

//Переменные для функции handleFormSubmit(evt)
const formElement = document.getElementById('editProfileForm');
const formAddNewElement = document.getElementById('addNewElementForm');

//карточки "из коробки"
const elementsTemplate = document.querySelector('#elements-template').content;


//функция открытия попапов
function showPopup(popup) {
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
    assembleElement(newElement, elementsList, elementsTemplate);
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
function returnElement(obj, template) {
    const userElement = template.cloneNode(true);
    const userElementImage = userElement.querySelector('.element__image');
    userElementImage.src = obj.link;
    userElement.querySelector('.element__title').textContent = obj.name;
    userElementImage.alt = obj.name;
    return userElement;
}
//функция добавления ноды в разметку. 
function addClone(userElement, parent) {
    parent.prepend(userElement);
}

//функция сбора карточки с добавлением слушателей
function assembleElement(obj, parent, template) {
    //ищем нужные кнопки в карточке
    const element = returnElement(obj, template);
    const likeBtn = element.querySelector('.element__likebtn');
    const elementImage = element.querySelector('.element__image');
    const deleteBtn = element.querySelector('.element__trashbtn');
    //функция слушателя лайков
    function likeListener() {
        likeBtn.classList.toggle('element__likebtn_active');
    }
    //функция открытия попапа картинки
    function openImage() {
        popupImagePic.src = elementImage.src;
        popupElement.textContent = elementImage.alt;
        showPopup(popupImage);
    }
    //функция удаления элемента
    function deleteElement() {
        likeBtn.removeEventListener('click', likeListener);
        elementImage.removeEventListener('click', openImage);
        deleteBtn.removeEventListener('click', deleteElement);
        deleteBtn.closest('.element').remove();

    }
    //вешаем обработчики
    likeBtn.addEventListener('click', likeListener);
    elementImage.addEventListener('click', openImage);
    deleteBtn.addEventListener('click', deleteElement);
    //добавляем элемент в разметку
    addClone(element, parent);
}

//рендер карточек из коробки
initialCards.forEach((input) => {
    assembleElement(input, elementsList, elementsTemplate);
})

//вешаем сабмит на кнопки
formElement.addEventListener('submit', handleFormSubmitProfile);
formAddNewElement.addEventListener('submit', handleFormSubmitElement);

//открытие попапов
profileEditBtn.addEventListener('click', () => {
    showPopup(popupEditProfile);
});

addElementBtn.addEventListener('click', () => {
    showPopup(popupAddNewElement);
});

//вешаем слушатели закрытия на все попапы
popupList.forEach(setClosePopupListener);