<template>
    <form class="gift-form">
        <label class="gift-label">
            <input type="checkbox" v-model="selected"/> Отправить этот заказ в подарок!
        </label>
        <p v-if="selected" class="gift-info">
            Укажите в заказе свой номер телефона, но адрес получателя подарка!
            Опишите адрес как можно точнее, что бы наш курьер нашёл получателя вовремя
            и не испортил сюрприз :)
        </p>
    </form>
</template>

<style scoped>
    .gift-info {
        font-size: small;
        padding-left: 2rem;
    }
    .gift-form {
        /*border: 1px solid gray;
        */
        background: #fcff99;

        margin: 0.2rem;
        padding: 0.5rem;
    }
</style>

<script>
export default {
    name: "GiftSuggestion",
    data: () => ({
        client: Object
    }),
    created() {
        this.client = this.$store.getters.client;
    },
    methods: {
        commitUpdates() {
            this.$store.commit("updateClient", this.client);
        },
    },
    computed: {
        selected: {
            get() {
                return this.$store.getters.giftSelected;
            },
            set(newValue) {
                this.$store.commit("updateGiftSelected", newValue);
            }
        }
    }
    /*,
    watch: {
        selected() {
            if (this.selected) {
                this.client.comment = 'SELECTED';
            }
            else {
                this.client.comment = 'NOT SELECTED';
            }
            this.commitUpdates();
        }
    }

     */
};
</script>

