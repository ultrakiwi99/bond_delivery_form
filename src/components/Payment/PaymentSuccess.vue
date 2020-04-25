<template>
    <div class="payment-success">
        <h5>
            Ваш Заказ принят.<br>
            Ожидайте звонка для подтверждения.
        </h5>
        <button @click="resetCartAndGoToMenu" class="primary">
            В меню
        </button>
    </div>
</template>

<script>
    export default {
        name: "PaymentSuccess",
        methods: {
            resetCartAndGoToMenu() {
                this.$store.commit('resetCart');
                this.$router.push('/');
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