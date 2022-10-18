const api_headers = {
    url: "https://mesto.nomoreparties.co/v1/cohort-48",
    headers: {
        authorization: 'c7779e8e-b945-41f5-b681-0ea9ccf3c32a',
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor(api_headers) {
        this._url = api_headers.url;
        this._headers = api_headers.headers;
    };

    _handleResponce(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    };

    async getApiCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        }).then(this._handleResponce);
    };

    async getApiUsers() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        }).then(this._handleResponce);
    };

    async setApiUsers(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._handleResponce);
    };

    createCards(card) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        }).then(this._handleResponce);
    };

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._handleResponce);
    };

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._handleResponce);
    };

    removeLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._handleResponce);
    };

    changeAvatar(Avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: Avatar,
            })
        }).then(this._handleResponce);
    };

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.removeLike(id);
        } else {
            return this.addLike(id);
        }
    }

};

const api = new Api(api_headers);
export default api;