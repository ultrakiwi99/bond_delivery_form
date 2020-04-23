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

    getPaymentUrl(amount) {
        const orderNumber = Math.round((Math.random() * 100000000));
        amount = Math.round((amount * 100));

        return this.makeApiCall(
            fetch(`${this.baseUrl}/payment/sberbank/url?amount=${amount}&orderNumber=${orderNumber}`)
        )
    }

    getGuestInfo(cardId) {
        return this.makeApiCall(fetch(`${this.baseUrl}/delivery/guest/${cardId}`, {
            method: 'GET'
        }));
    }

    refreshUserInfo({card, name, phone, address, lastStore}) {
        return this.makeApiCall(fetch(`${this.baseUrl}/delivery/guest/${card}`, {
            method: 'POST',
            body: JSON.stringify({name, phone, address, lastStore})
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