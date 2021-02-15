export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_status_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_status_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        //функция закрытия по Esc   
        if (evt.key === 'Escape') {
            this.close();
        }
    }



    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            const target = evt.target;
            if (target.classList.contains('popup') || target.classList.contains('popup__closebtn')) {
                this.close();
            }
        });
    }
}