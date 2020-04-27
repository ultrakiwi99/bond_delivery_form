<template>
    <form @submit.prevent="">
        <h3>Данные заказа</h3>
        <input placeholder="Ваше имя" required type="text" v-model="name"/>
        <input placeholder="Адрес" required type="text" v-model="address"/>
        <input placeholder="Телефон" required type="tel" v-model="phone"/>
        <textarea placeholder="Комментарий" rows="3" style="width: 100%" v-model="comment"></textarea>
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