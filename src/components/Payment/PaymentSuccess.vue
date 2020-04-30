<template>
    <div class="payment-success">
        <RedirectToMenu/>
        <h5>
            Ваш Заказ принят.<br>
            Ожидайте звонка для подтверждения.
        </h5>
        <PaymentCard :amount="total" v-if="total > 0"/>
        <button @click="resetCartAndGoToMenu" class="primary">
            В меню
        </button>
    </div>
</template>

<script>
    import PaymentCard from "@/components/Payment/PaymentCard";
    import RedirectToMenu from "@/components/Checkout/RedirectToMenu";

    export default {
        name: "PaymentSuccess",
        components: {RedirectToMenu, PaymentCard},
        methods: {
            resetCartAndGoToMenu() {
                this.$store.commit('resetCart');
                this.$router.push('/');
            }
        },
        computed: {
            cart() {
                return this.$store.getters.cart;
            },
            total() {
                return this.cart.reduce((carry, product) => carry + product.price, 0);
            }
        }
    }
</script>

<style scoped>
    .payment-success {
        display: flex;
        height: 40vh;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    h3, h5 {
        text-align: center;
    }
</style>