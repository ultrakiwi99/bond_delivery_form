export default class Api {
    constructor() {
        this.baseUrl = 'http://portal.coffeebon.ru:8084/api'
    }

    sendOrder(client, store, cart) {
        return this.makeApiCall(fetch(`${this.baseUrl}/delivery/send/mail`, {
            method: 'POST',
            body: JSON.stringify({
                client: {...client},
                order: [...cart],
                store: {...store}
            })
        }));
    }

    getGuestInfo(cardId) {
        return this.makeApiCall(fetch(`${this.baseUrl}/delivery/guest/${cardId}`, {
            method: 'GET'
        }));
    }

    refreshUserInfo({card, name, phone, address}) {
        return this.makeApiCall(fetch(`${this.baseUrl}/delivery/guest/${card}`, {
            method: 'POST',
            body: JSON.stringify({name, phone, address})
        }));
    }

    makeApiCall(call) {
        return call
            .then(response => response.json())
            .then(json => this.validResult(json))
    }

    validResult(json) {
        if (json.result === 'error') {
            throw Error(json.message);
        }
        return json;
    }
}