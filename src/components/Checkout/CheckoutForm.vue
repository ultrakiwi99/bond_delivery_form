<template>
    <form @submit.prevent="sendOrderEmail" class="checkout-form">
        <h3>Данные заказа</h3>
        <input id="name" placeholder="Ваше имя" required type="text" v-model="client.name"/>
        <input id="address" placeholder="Адрес" required type="text" v-model="client.address"/>
        <input id="phone"
               placeholder="Телефон"
               required
               type="tel"
               v-mask="'+7##########'"
               v-model="client.phone"/>
        <textarea id="comment" placeholder="Комментарий" rows="3" style="width: 99%"
                  v-model="client.comment"></textarea>
        <div class="controls">
            <button @click="$router.push('/')" class="secondary">Меню</button>
            <button id="submit" type="submit" class="btn" v-show="submitEnabled">Заказать</button>
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
            client: {}
        }),
        methods: {
            update(dataItemName) {
                const payload = {};
                payload[dataItemName] = this[dataItemName];
                this.$store.commit('updateClient', payload);
            },
            sendOrderEmail() {
                const store = this.$store.getters.lastStore;
                const cart = this.$store.getters.cart;

                this.$api
                    .sendOrder(this.client, store, cart)
                    .then(() => {
                        this.$store.dispatch('saveClientInfo');
                        this.$router.push('/payment_success');
                    })
                    .catch(error => console.log(error));
            }
        },
        computed: {
            submitEnabled() {
                return !!this.client.name && !!this.client.address && !!this.client.phone;
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