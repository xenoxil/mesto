import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._callBack = submitCallBack;
        this._submitBtn = this._popup.querySelector('.popup__submitbtn');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
    }
    _getInputValues() {
        const inputs = {};
        this._inputList.forEach((input) => {
            inputs[input.name] = input.value;
        })
        return inputs;
    }
    setEventListeners() {

        this._form.addEventListener('submit', () => { this._callBack(this._getInputValues()) });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

}