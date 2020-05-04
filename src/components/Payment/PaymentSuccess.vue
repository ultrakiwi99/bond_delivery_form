<template>
    <div class="payment-success">
        <PaymentStatusForProduct/>
        <RedirectToMenu/>
        <CheckoutWaitForOrderConfirmation
                :order-id="orderId"
                @approved="approve"
        />
        <PaymentCard :amount="toPay" :order-id="orderId" v-if="showPayment"/>
        <button @click="resetCartAndGoToMenu" class="primary">В меню</button>
    </div>
</template>

<script>
    import PaymentCard from "@/components/Payment/PaymentCard";
    import RedirectToMenu from "@/components/Checkout/RedirectToMenu";
    import CheckoutWaitForOrderConfirmation from "../Checkout/CheckoutWaitForOrderConfirmation";
    import PaymentStatusForProduct from "@/components/Payment/PaymentStatusForProduct";

    export default {
        name: "PaymentSuccess",
        components: {
            PaymentStatusForProduct,
            RedirectToMenu,
            PaymentCard,
            CheckoutWaitForOrderConfirmation,
        },
        created() {
            this.orderId = parseInt(this.$route.query['createdOrderId']);
        },
    data: () => ({
        orderId: null,
        showPayment: false,
        toPay: null
    }),
    methods: {
        resetCartAndGoToMenu() {
            this.$store.commit("resetCart");
            this.$router.push("/");
        },
        approve(amount) {
            this.showPayment = true;
            this.toPay = parseFloat(amount);
        }
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        }
    },
};
</script>

<style scoped>
.payment-success {
    display: flex;
    height: 40vh;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

h3,
h5 {
    text-align: center;
}
</style>
