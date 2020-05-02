<template>
    <div class="payment-success">
        <RedirectToMenu />
        <CheckoutWaitForOrderConfimation
            :order-id="orderId"
            @approved="showPayment = true"
        />
        <PaymentCard :amount="total" v-if="showPayment && total > 0" />
        <button @click="resetCartAndGoToMenu" class="primary">
            В меню
        </button>
    </div>
</template>

<script>
import PaymentCard from "@/components/Payment/PaymentCard";
import RedirectToMenu from "@/components/Checkout/RedirectToMenu";
import CheckoutWaitForOrderConfimation from "../Checkout/CheckoutWaitForOrderConfirmation";

export default {
    name: "PaymentSuccess",
    components: {
        RedirectToMenu,
        PaymentCard,
        CheckoutWaitForOrderConfimation,
    },
    created() {
        this.orderId = parseInt(this.$route.query.orderId);
    },
    data: () => ({
        orderId: null,
        showPayment: false,
    }),
    methods: {
        resetCartAndGoToMenu() {
            this.$store.commit("resetCart");
            this.$router.push("/");
        },
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        },
        total() {
            return this.cart.reduce(
                (carry, product) => carry + product.price,
                0
            );
        },
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
