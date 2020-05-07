<template>
    <div>
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
        </p>
        <p>
            <strong>НЕ ЗАКРЫВАЙТЕ</strong> эту страницу<br/>
            для оплаты ОНЛАЙН. После подтверждения заказа<br/>
            появится кнопка оплаты.
        </p>
        <div class="loader"></div>
    </div>
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

    .loader,
    .loader:before,
    .loader:after {
        background: black;
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
    }
    .loader {
        color: black;
        text-indent: -9999em;
        margin: 88px auto;
        position: relative;
        font-size: 11px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
        position: absolute;
        top: 0;
        content: '';
    }
    .loader:before {
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    .loader:after {
        left: 1.5em;
    }
    @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
    }
    @keyframes load1 {
        0%,
        80%,
        100% {
            box-shadow: 0 0;
            height: 4em;
        }
        40% {
            box-shadow: 0 -2em;
            height: 5em;
        }
    }

</style>
