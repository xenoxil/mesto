import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImagePic = this._popup.querySelector('.popup__image');
        this._popupimageText = this._popup.querySelector('.popup__element');

    }
    open(image) {
        this._popupImagePic.src = image.src;
        this._popupimageText.textContent = image.alt;
        super.open();
        super.setEventListeners();
    }

}