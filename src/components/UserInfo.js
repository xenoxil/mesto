export default class UserInfo {
    constructor({ nameSelector, titleSelector }) {
        this._nameSelector = nameSelector;
        this._titleSelector = titleSelector;
        this._name = '';
        this._title = '';

    }
    getUserInfo() {
        const info = {};
        info.name = this._nameSelector.textContent;
        info.title = this._titleSelector.textContent;
        return info;
    }
    setUserInfo(updateName, updateTitle) {
        this._nameSelector.textContent = updateName;
        this._titleSelector.textContent = updateTitle;

    }

}