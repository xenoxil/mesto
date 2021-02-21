import { Popup } from './Popup.js'
export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._submitBtn = this._popup.querySelector('.popup__submitbtn');
        this._submitFunction = () => console.log('Пустая функция удаления');
    }
    setEventListeners() {
        this._popup.querySelector('.popup__submitbtn').addEventListener('click', this._submitFunction);
        super.setEventListeners();
    }
    setSubmitBehaviour(submitFunction) {
        debugger
        this._popup.querySelector('.popup__submitbtn').removeEventListener('click', this._submitFunction);
        this._submitFunction = submitFunction;
        this._popup.querySelector('.popup__submitbtn').addEventListener('click', this._submitFunction);
    }

    renderLoading(isLoading, loadingText, finishText) {
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
        } else {
            this._submitBtn.textContent = finishText;
        }
    }
}