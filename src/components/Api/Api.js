export default class Api {
    constructor() {
        this.baseUrl = 'http://portal.coffeebon.ru:8084/api'
    }

    sendOrder(client, store, cart) {
        return fetch(this.baseUrl + '/delivery/send/mail', {
            method: 'POST',
            body: JSON.stringify({
                client: {...client},
                order: [...cart],
                store: {...store}
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.result === 'error') {
                    throw Error(json.message);
                }
                return json;
            });
    }
}