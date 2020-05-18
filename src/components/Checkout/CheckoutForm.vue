<template>
    <form @submit.prevent="sendOrderEmail" class="checkout-form">
        <h3>Данные заказа</h3>
        <input
            id="name"
            placeholder="Ваше имя"
            required
            type="text"
            v-model="client.name"
        />
        <input
            id="address"
            placeholder="Адрес"
            required
            type="text"
            v-model="client.address"
        />
        <input
            id="phone"
            placeholder="Телефон +7(xxx)xxx-xx-xx"
            required
            type="tel"
            v-mask="'+#(###)###-##-##'"
            v-model="client.phone"
        />
        <textarea
            id="comment"
            placeholder="Комментарий"
            rows="3"
            style="width: 99%"
            v-model="client.comment"
        ></textarea>
        <div class="controls">
            <button @click="$router.push('/')" class="secondary">Меню</button>
            <button
                id="submit"
                type="submit"
                class="btn"
                v-show="submitEnabled"
            >
                Заказать
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: "CheckoutForm",
    created() {
        this.client = this.$store.getters.client;
    },
    data: () => ({
        client: {},
    }),
    methods: {
        updateClient() {
            this.$store.commit("updateClient", this.client);
        },
        sendOrderEmail() {
            const store = this.$store.getters.lastStore;
            const cart = this.$store.getters.cart;
            const client = { ...this.client };

            client.lastStore = JSON.stringify(client.lastStore);

            if (this.$store.getters.giftSelected) {
                client.comment = "**В ПОДАРОК**\n" + client.comment;
            }

            this.$api
                .sendOrder(client, store, cart)
                .then((response) => {
                    if (!response.orderId) {
                        throw Error(
                            "Не получен идентификтор заказа с сервера."
                        );
                    }
                    this.$store.dispatch("saveClientInfo");
                    this.$router.push(
                        `/payment_success?createdOrderId=${response.orderId}`
                    );
                })
                .catch((error) => console.log(error));
        },
    },
    computed: {
        submitEnabled() {
            return (
                !!this.client.name &&
                !!this.client.address &&
                !!this.client.phone
            );
        },
    },
    watch: {
        name() {
            this.updateClient();
        },
        address() {
            this.updateClient();
        },
        phone() {
            this.updateClient();
        },
        comment() {
            this.updateClient();
        },
    },
};
</script>
