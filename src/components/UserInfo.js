export default class UserInfo {
    constructor({ nameSelector, titleSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._titleSelector = titleSelector;
        this._avatarSelector = avatarSelector;
        this._name = '';
        this._title = '';
        this._id = '';
        this._avatar = '';

    }
    getUserInfo() {
        const info = {}
        info.name = this._nameSelector.textContent;
        info.title = this._titleSelector.textContent;
        info.id = this._id;
        info.avatar = this._avatar;

        return info;
    }
    setUserInfo({ name, about, _id, avatar }) {
        this._name = name
        this._id = _id;
        this._title = about;
        this._avatar = avatar;
    }

    updateUserInfo() {
        this._nameSelector.textContent = this._name;
        this._titleSelector.textContent = this._title;
        this._avatarSelector.src = this._avatar;
    }

    getUserId() {
        return this._id;
    }

}