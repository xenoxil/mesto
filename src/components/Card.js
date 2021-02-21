export class Card {
    constructor(obj, template, handleCardClick, handleDeleteClick, handleLikeClick, devId) {
        this._obj = obj;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._deleteButtonClick = handleDeleteClick;
        this._likeListener = handleLikeClick;
        this._cardId = obj._id;
        this._ownerid = obj.owner._id;
        this._devId = devId;
        this._likeBtn = '';
        this._elementImage = '';
        this._deleteBtn = '';
        this._counter = '';
        this._likeCount = this._obj.likes.length;
        this._likes = this._obj.likes;
    }
    _returnElement() {
        const userElement = this._template.children[0].cloneNode(true);
        const userElementImage = userElement.querySelector('.element__image');
        userElementImage.src = this._obj.link;
        userElement.querySelector('.element__title').textContent = this._obj.name;
        userElementImage.alt = this._obj.name;
        return userElement;
    }

    //функция сбора карточки с добавлением слушателей
    assembleElement() {
            //ищем нужные кнопки в карточке
            const element = this._returnElement(this._obj, this._template);
            element.id = this._obj._id;
            this._likeBtn = element.querySelector('.element__likebtn');
            this._elementImage = element.querySelector('.element__image');
            this._deleteBtn = element.querySelector('.element__trashbtn');
            this._counter = element.querySelector('.element__likecounter');

            //проверяем лайки на карточке и отображаем кол-во
            if (this._likeCount) {
                this._counter.textContent = this._likeCount;
                if (this.isLiked(this._devId)) {
                    this._likeBtn.classList.add('element__likebtn_active')
                }
            } else {
                this._counter.textContent = '0';
            }







            //вешаем обработчики
            this._likeBtn.addEventListener('click', this._likeListener);
            this._elementImage.addEventListener('click', this._handleCardClick);
            this._deleteBtn.addEventListener('click', this._deleteButtonClick);
            if (this._devId != this._ownerid) {
                this._deleteBtn.removeEventListener('click', this._deleteButtonClick);
                this._deleteBtn.remove();
            }
            return element;
        }
        //функция удаления элемента
    deleteElement() {
        this._likeBtn.removeEventListener('click', this._likeListener);
        this._elementImage.removeEventListener('click', this._handleCardClick);
        this._deleteBtn.removeEventListener('click', this._deleteButtonClick);
        this._deleteBtn.closest('.element').remove();
    }

    getCardId() {
        return this._cardId;
    }
    isLiked(userId) {
        return Boolean(this._likes.find((item) => item._id === userId));
    }
    updateLikes({ likes }) {
        this._counter.textContent = likes.length;
        this._likes = likes;
    }



}