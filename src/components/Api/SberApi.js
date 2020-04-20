export default class SberApi {
    constructor() {
        this.registerUrl = 'https://3dsec.sberbank.ru/payment/rest/register.do';
        this.userName = 'coffeebon-api';
        this.password = 'coffeebon';
    }

    getRegisterUrl() {
        return fetch(this.registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                userName: this.userName,
                password: this.password
            })
        });
    }
}