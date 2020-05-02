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
        this.interval = setInterval(this.startCheckingOrderStatus, 5000);
    },
    props: {
        orderId: {
            type: Number,
            required: true,
        },
    },
    data: () => ({ status: "new", interval: null, tries: 0, maxTries: 300 }),
    methods: {
        startCheckingOrderStatus() {
            if (this.tries >= this.maxTries) {
                clearInterval(this.interval);
            }
            this.tries++;
            this.$api.checkOrderStatus(this.orderId);
        },
    },
    destroyed() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    },
};
</script>

<style></style>
