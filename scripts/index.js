//Обьявляем переменные для обработки кликов
let profileEditBtn = document.querySelector('.profile-info__edit-btn');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__closebtn');

//обьявляем переменные для обработки инпутов
let Name = document.querySelector('.profile-info__name');
let Title = document.querySelector('.profile__title');
let inputs = document.querySelectorAll('.popup__input');
let inputName = inputs[0];
let inputTitle = inputs[1];



function popupShow() {
    popup.classList.add('popup_opened');
    inputName.value = Name.textContent;
    inputTitle.value = Title.textContent;
}
profileEditBtn.addEventListener('click', popupShow);

function popupClose() {
    popup.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', popupClose);


// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Воспользуйтесь методом querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Находим поля формы в DOM
    let nameInput = inputName.value; // Воспользуйтесь инструментом .querySelector()
    let jobInput = inputTitle.value; // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей


    // Вставьте новые значения с помощью textContent
    Name.textContent = nameInput;
    Title.textContent = jobInput;
    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


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