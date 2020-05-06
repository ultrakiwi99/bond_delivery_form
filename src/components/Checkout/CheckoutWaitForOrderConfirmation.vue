<template>
    <div v-if="status === 'approved'" class="wait-for-confirm">
        <h2>Заказ подтверждён!</h2>
        <div v-if="comment && comment.length > 0"  >
            <h3>Комментарий оператора:</h3>
            <p>{{ comment }}</p>
        </div>
    </div>
    <div v-else class="wait-for-confirm">
        <h3>Ваш Заказ принят</h3>
        <p>
            Ожидайте звонка для подтверждения.
            <br/><br/>
            <strong>НЕ ЗАКРЫВАЙТЕ</strong> эту страницу<br/>
            для оплаты ОНЛАЙН. После подтверждения заказа<br/>
            появится кнопка оплаты.
        </p>
    </div>
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
                        this.status = response.status;
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

<style>
    .wait-for-confirm {
        text-align: center;
    }



</style>
