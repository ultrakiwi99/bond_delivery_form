<template>
    <div>
        <Hero :title="`Оформить заказ`"/>
        <Cart/>
        <StoreSelector/>
        <CheckoutForm/>
    </div>
</template>

<script>
    import StoreSelector from "@/components/Store/StoreSelector";
    import CheckoutForm from "@/components/Checkout/CheckoutForm";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";

    export default {
        name: "Checkout",
        components: {Hero, StoreSelector, CheckoutForm, Cart},
        created() {
            this.returnIfEmptyCart();
        },
        methods: {
            returnIfEmptyCart() {
                if (!this.cartHasProducts) {
                    this.$router.push('/');
                }
            }
        },
        computed: {
            cartHasProducts() {
                return this.$store.getters.cartHasProducts;
            }
        },
        watch: {
            cartHasProducts() {
                this.returnIfEmptyCart();
            }
        }
    }
</script>

<style scoped>
    h2 {
        text-align: center;
    }

    .controls {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>