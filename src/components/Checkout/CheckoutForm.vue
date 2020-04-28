<template>
    <form class="checkout-form" @submit.prevent="">
        <h3>Данные заказа</h3>
        <input id="name" placeholder="Ваше имя" required type="text" v-model="name"/>
        <input id="address" placeholder="Адрес" required type="text" v-model="address"/>
        <input id="phone" placeholder="Телефон" required type="tel" v-model="phone"/>
        <textarea id="comment" placeholder="Комментарий" rows="3" style="width: 99%" v-model="comment"></textarea>
        <div class="controls">
            <button @click="$router.push('/')" class="secondary">Меню</button>
            <button :disabled="submitDisabled" id="submit" type="submit">Заказать</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: "CheckoutForm",
        created() {
            const client = this.$store.getters.client;
            if (client) {
                this.name = client.name;
                this.address = client.address;
                this.phone = client.phone;
                this.comment = client.comment;
            }
        },
        data: () => ({
            name: null,
            address: null,
            phone: null,
            comment: null
        }),
        methods: {
            update(dataItemName) {
                const payload = {};
                payload[dataItemName] = this[dataItemName];
                this.$store.commit('updateClient', payload);
            },
            sendOrderEmail() {
                if (!this.cartHasProducts) {
                    return;
                }

                const store = this.$store.getters.lastStore;
                const client = this.$store.getters.client;
                const cart = this.$store.getters.cart;

                if (!store || !this.$store.getters.clientIsValidToSend) {
                    return;
                }

                this.$api
                    .sendOrder(client, store, cart)
                    .then(() => {
                        client.lastStore = JSON.stringify(store);
                        if (localStorage) {
                            localStorage.setItem('lastClientInfo', JSON.stringify(client));
                        }
                        this.$api.refreshUserInfo({...client});
                        this.$router.push('/payment_success');
                    })
                    .catch(error => this.message = error.message);
            }
        },
        computed: {
            submitDisabled() {
                return [
                    this.name,
                    this.address,
                    this.phone
                ].every(input => input === null);
            }
        },
        watch: {
            name() {
                this.update('name');
            },
            address() {
                this.update('address');
            },
            phone() {
                this.update('phone');
            },
            comment() {
                this.update('comment');
            }
        }
    }
</script>