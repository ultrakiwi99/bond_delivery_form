<template>
    <h5>
        Ваш Заказ принят.<br />
        Ожидайте звонка для подтверждения.
    </h5>
</template>

<script>
export default {
    name: "CheckoutWaitForPaymentConfirmation",
    created() {
        setInterval(this.startCheckingOrderStatus, 5000);
    },
    props: {
        orderId: Number,
    },
    data: () => ({ status: "new" }),
    methods: {
        startCheckingOrderStatus() {},
    },
    destroyed() {
        clearInterval(this.startCheckingOrderStatus);
    },
};
</script>

<style></style>
