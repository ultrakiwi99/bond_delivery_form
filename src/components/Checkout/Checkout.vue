<template>
    <div>
        <Hero :title="`Оформить заказ`"/>
        <Cart/>
        <ClientAutofill>
            <StoreSelector/>
            <CheckoutForm/>
        </ClientAutofill>
        <div class="controls">
            <button @click="$router.push('/')" class="primary">Меню</button>
            <button @click="sendOrderEmail" role="button">Заказать</button>
        </div>
    </div>
</template>

<script>
    import ClientAutofill from "@/components/Client/ClientAutofill";
    import StoreSelector from "@/components/Store/StoreSelector";
    import CheckoutForm from "@/components/Checkout/CheckoutForm";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";

    export default {
        name: "Checkout",
        components: {Hero, ClientAutofill, StoreSelector, CheckoutForm, Cart},
        methods: {
            sendOrderEmail() {
                if (!this.cartHasProducts) {
                    return;
                }

                const store = this.$store.getters.lastStore;
                const client = this.$store.getters.client;
                const cart = this.$store.getters.cart;

                if (!store || !this.$store.getters.clientIsValidToSend) {
                    return;
                }

                this.$api
                    .sendOrder(client, store, cart)
                    .then(() => {
                        client.lastStore = JSON.stringify(store);
                        if (localStorage) {
                            localStorage.setItem('lastClientInfo', JSON.stringify(client));
                        }
                        this.$api.refreshUserInfo({...client});
                        this.$router.push('/payment_success');
                    })
                    .catch(error => this.message = error.message);
            }
        },
        computed: {
            cartHasProducts() {
                return this.$store.getters.cartHasProducts;
            }
        },
        watch: {
            cartHasProducts() {
                if (!this.cartHasProducts) {
                    this.$router.push('/');
                }
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