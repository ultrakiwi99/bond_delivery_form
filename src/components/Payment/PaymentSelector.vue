<template>
    <div class="payment-selector">
        <div class="selector">
            <input id="offline" type="radio" v-model="paymentType" value="offline">
            <label for="offline">Курьеру</label>
        </div>
        <div class="selector">
            <input id="online" type="radio" v-model="paymentType" value="online">
            <label for="online">Онлайн</label>
        </div>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "PaymentSelector",
        props: {
            value: {
                type: String,
                default: 'offline'
            }
        },
        beforeMount() {
            this.paymentType = this.value;
        },
        data: () => ({
            paymentType: 'offline'
        }),
        watch: {
            paymentType() {
                return this.$emit('input', this.paymentType);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .selector {
        display: flex;
        align-items: center;
    }
</style>