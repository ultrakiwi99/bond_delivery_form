<template>
    <h5>
        Ваш Заказ принят.<br/>
        Ожидайте звонка для подтверждения.
        <br>
        <br>
        <span v-if="comment && comment.length > 0">Комментарий оператора: {{ comment }}</span>
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
    data: () => ({
        status: "new",
        amount: null,
        comment: null,
        interval: null,
        tries: 0,
        maxTries: 300
    }),
    methods: {
        startCheckingOrderStatus() {
            if (this.tries >= this.maxTries) {
                clearInterval(this.interval);
            }
            this.tries++;
            this.$api
                .checkOrderStatus(this.orderId)
                .then((response) => {
                    if (response.status === "approved") {
                        clearInterval(this.interval);
                        this.amount = response.amount;
                        this.comment = response.comment;
                        this.$emit("approved", this.amount);
                    }
                })
                .catch((error) => {
                    clearInterval(this.interval);
                    console.log(error);
                });
        },
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
};
</script>

<style></style>
