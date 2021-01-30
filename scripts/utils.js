export const elementsTemplate = document.querySelector('#elements-template').content;
export const elementsList = document.querySelector('.elements');
export const popupImage = document.querySelector('.popupImage');
export const popupImagePic = document.querySelector('.popup__image');
export const popupElement = document.querySelector('.popup__element');


export const EscBtn = 'Escape';

//функция открытия попапов
export function showPopup(popup) {
    popup.classList.add('popup_status_opened');
    document.addEventListener('keydown', closeEsc);
}

//функция закрытия попапов
export function closePopup(popup) {
    popup.classList.remove('popup_status_opened');
    document.removeEventListener('keydown', closeEsc);

}

//функция закрытия по Esc
function closeEsc(evt) {
    const targetPopup = document.querySelector('.popup_status_opened');
    if (targetPopup) {
        if (evt.key === EscBtn) {
            closePopup(targetPopup);
        }
    }
};