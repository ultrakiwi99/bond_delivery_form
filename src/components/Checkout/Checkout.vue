<template>
    <div>
        <RedirectToMenu/>
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
    import RedirectToMenu from "@/components/Checkout/RedirectToMenu";

    export default {
        name: "Checkout",
        components: {RedirectToMenu, Hero, StoreSelector, CheckoutForm, Cart}
    }
</script>

<style scoped>
    h2 {
        text-align: center;
    }
</style>