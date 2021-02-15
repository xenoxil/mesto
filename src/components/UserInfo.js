export default class UserInfo {
    constructor({ nameSelector, titleSelector }) {
        this._nameSelector = nameSelector;
        this._titleSelector = titleSelector;
        this._name = '';
        this._title = '';

    }
    getUserInfo() {
        const info = {};
        info.name = this._name;
        info.title = this._title;
        return info;
    }
    setUserInfo(updateName, updateTitle) {
        this._name = updateName;
        this._title = updateTitle;

    }
    updateProfileInfo() {
        this._name = this._nameSelector.textContent;
        this._title = this._titleSelector.textContent;
    }

}