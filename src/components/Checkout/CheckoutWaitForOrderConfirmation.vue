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
        orderId: Number,
    },
    data: () => ({ status: "new", interval: null, tries: 0, maxTries: 300 }),
    methods: {
        startCheckingOrderStatus() {
            if (this.tries >= this.maxTries) {
                clearInterval(this.interval);
            }
            this.tries++;
            this.$api
                .checkForOrderStatus(this.orderId)
                .then((status) => {
                    if (status === "approved") {
                        clearInterval(this.interval);
                        this.$emit("approved");
                    }
                })
                .catch((error) => {
                    clearInterval(this.interval);
                    console.log(error);
                });
        },
    },
    beforeDestroy() {
        clearInterval(this.startCheckingOrderStatus);
    },
};
</script>

<style></style>
