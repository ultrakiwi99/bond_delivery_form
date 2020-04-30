<template>
    <div>
        <RedirectToMenu/>
        <Hero :title="`Оформить заказ`"/>
        <Cart/>
        <ClientAutofill>
            <StoreSelector/>
            <CheckoutForm/>
        </ClientAutofill>
    </div>
</template>

<script>
    import ClientAutofill from "@/components/Client/ClientAutofill";
    import StoreSelector from "@/components/Store/StoreSelector";
    import CheckoutForm from "@/components/Checkout/CheckoutForm";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";
    import RedirectToMenu from "@/components/Checkout/RedirectToMenu";

    export default {
        name: "Checkout",
        components: {RedirectToMenu, Hero, ClientAutofill, StoreSelector, CheckoutForm, Cart}
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