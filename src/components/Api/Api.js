import axios from "axios";

axios.defaults.timeout = 1800;

export default class Api {
    constructor() {
        this.baseUrl = "http://portal.coffeebon.ru:8084/api";
    }

    sendOrder(client, store, cart) {
        return this.makeApiCall(
            fetch(`${this.baseUrl}/delivery/send/mail`, {
                method: "POST",
                body: JSON.stringify({
                    client: { ...client },
                    order: [...cart],
                    store: { ...store },
                }),
            })
        );
    }

    getPaymentUrl(amount) {
        const queryString = this.buildQuery({
            amount: Math.round(amount * 100),
            orderNumber: Math.round(Math.random() * 100000000),
            successUrl: window.location.origin + "/payment_success/#/?",
            failUrl: window.location.origin + "/payment_failed/#/?",
        });
        return this.makeApiCall(
            fetch(`${this.baseUrl}/payment/sberbank/url${queryString}`)
        );
    }

    getGuestInfo(cardId) {
        return this.makeApiCall(
            fetch(`${this.baseUrl}/delivery/guest/${cardId}`, {
                method: "GET",
            })
        );
    }

    refreshUserInfo({ card, name, phone, address, lastStore }) {
        return this.makeApiCall(
            fetch(`${this.baseUrl}/delivery/guest/${card}`, {
                method: "POST",
                body: JSON.stringify({ name, phone, address, lastStore }),
            })
        );
    }

    checkOrderStatus(orderId) {
        return this.makeApiCall(
            fetch(`${this.baseUrl}/delivery/order/status/${orderId}`)
        );
    }

    makeApiCall(call) {
        return call
            .then((response) => response.json())
            .then((json) => this.validResult(json));
    }

    validResult(json) {
        if (json.result === "error") {
            throw Error(json.message);
        }
        return json;
    }

    buildQuery(param) {
        return (
            "?" +
            Object.entries(param)
                .map((pair) => pair.map(encodeURIComponent).join("="))
                .join("&")
        );
    }
}
