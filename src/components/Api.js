export class Api {
    constructor(options) {
        // тело конструктора
        this._options = options;
        this._headers = this._options.headers;

    }

    getInitialCards() {
        // ...
        return fetch(`${this._options.baseUrl}/cards`, {
                headers: this._options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
    }

    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: this._options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: удаление${res.status}`) }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
                headers: this._options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    editProfile(newName, newTitle) {
        return fetch(`${this._options.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._options.headers,
                body: JSON.stringify({
                    name: newName,
                    about: newTitle
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }
    getInfo() {
        return Promise.all([this.getInitialCards(), this.getProfile()])
    }
    sendElement({ name, link }) {
        return fetch(`${this._options.baseUrl}/cards`, {
                method: 'POST',
                headers: this._options.headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            })
    }
    changeAvatarIcon(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._options.headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка обновления аватара: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка обновления аватара ${err}`)
            })
    }
    sendLike(id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при отправке лайка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка при отправке лайка`)
            })
    }
    removeLike(id) {
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._options.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else { return Promise.reject(`Ошибка при удалении лайка: ${res.status}`) }
            })
            .catch((err) => {
                console.log(`Ошибка при удалении лайка ${err}`)
            })
    }

}
// другие методы работы с API