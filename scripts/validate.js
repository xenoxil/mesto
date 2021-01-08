//конфиг
const config = {
        formSelector: '.popup__container',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submitbtn',
        inactiveButtonClass: 'popup__submitbtn_status_inactive',
        errorClass: '.popup__input_state_invalid'
    }
    //функция показа ошибки
function showError(input, form, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.errorClass);
}
//функция удаления ошибки
function hideError(input, form, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.errorClass);
}

//проверка валидности инпута
function isValid(input, form, config) {
    if (input.validity.valid) {
        hideError(input, form, config);
    } else {
        showError(input, form, config);
    }
}

//изменение статуса кнопки сабмит 
function setSubmitBtnState(btn, validationStatus, config) {
    if (!validationStatus) {
        btn.classList.add(config.inactiveButtonClass);
        btn.disabled = true;
    } else {
        btn.classList.remove(config.inactiveButtonClass);
        btn.disabled = false;
    }
}

// повесить обработчики на инпуты
function setErrorListener(form, config) {
    const submitBtn = form.querySelector(config.submitButtonSelector);
    const inputList = form.querySelectorAll(config.inputSelector);

    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            isValid(input, form, config);
            setSubmitBtnState(submitBtn, form.checkValidity(), config);
        })
    })
}
// включить валидацию по конфигу
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach((form) => {
        const submitBtn = form.querySelector(config.submitButtonSelector);
        setErrorListener(form, config);
        setSubmitBtnState(submitBtn, form.checkValidity(), config);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    })
}

enableValidation(config);