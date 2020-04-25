<template>
    <div class="payment-success">
        <h3>
            Спасибо за оплату.
        </h3>
        <h5>
            Ваш Заказ принят.<br>
            Ожидайте звонка для подтверждения.
        </h5>
        <button @click="$router.push('/')" class="primary">
            В меню
        </button>
    </div>
</template>

<script>
    export default {
        name: "PaymentSuccess"
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