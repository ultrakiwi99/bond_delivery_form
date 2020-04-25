<template>
    <div class="payment-failed">
        <h1>Оплата не прошла.</h1>
        <button @click="$router.push('/')" class="primary">
            В меню
        </button>
    </div>
</template>

<script>
    export default {
        name: "PaymentFailed"
    }
</script>

<style scoped>
    .payment-failed {
        display: flex;
        height: 40vh;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        text-align: center;
    }
</style>