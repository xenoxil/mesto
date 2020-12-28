//Обьявляем переменные для обработки кликов
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__closebtn');

//обьявляем переменные для обработки инпутов
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');
let inputName = document.querySelector('.popup__profilename');
let inputTitle = document.querySelector('.popup__profiletitle');

//Переменные для функции handleFormSubmit(evt)
let formElement = document.querySelector('.popup__container');





function showPopup() {
    popup.classList.add('popup_status_opened');
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
}


function closePopup() {
    popup.classList.remove('popup_status_opened');
}



// Находим форму в DOM

// Воспользуйтесь методом querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Находим поля формы в DOM
    // Воспользуйтесь инструментом .querySelector()
    // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    const nameInput = inputName.value;
    const jobInput = inputTitle.value;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput;
    profileTitle.textContent = jobInput;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

profileEditBtn.addEventListener('click', showPopup);

closeBtn.addEventListener('click', closePopup);


/*let likeBtns = document.querySelectorAll('.element__likebtn');
let likeElem = likeBtns[0];
let likeElem2 = likeBtns[1];
let likeElem3 = likeBtns[2];
let likeElem4 = likeBtns[3];
let likeElem5 = likeBtns[4];
let likeElem6 = likeBtns[5];


function likeActive() {
    likeBtns.classList.toogle('element__likebtn_active');
}
likeElem.addEventListener('click', likeActive);*/