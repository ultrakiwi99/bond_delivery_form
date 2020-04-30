<template>
    <div>
        <div class="payment-description">
            <button :disabled="!this.registerUrl" @click="goToPayment" class="primary">Оплатить онлайн</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PaymentCard",
        beforeMount() {
            this.$api
                .getPaymentUrl(this.amount)
                .then(result => {
                    this.registerUrl = result['formUrl'];
                })
                .catch(error => console.log(error));
        },
        props: {
            amount: {
                type: Number,
                default: null
            }
        },
        data: () => ({
            registerUrl: null
        }),
        methods: {
            goToPayment() {
                window.location.href = this.registerUrl;
            }
        }
    }
</script>

<style scoped>
    .payment-description {
        padding: 1rem;
        margin: 1rem;
        color: #8795a1;
    }
</style>