<template>
    <div>
        <Hero :title="`Оформить заказ`"/>
        <Cart v-if="cartHasProducts"/>
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
                if (!this.store) {
                    return;
                }
                if (!this.cartHasProducts) {
                    return;
                }

                this.$api
                    .sendOrder(this.client, this.store, this.cart)
                    .then(() => {
                        this.client.lastStore = JSON.stringify(this.store);
                        if (localStorage) {
                            localStorage.setItem('lastClientInfo', JSON.stringify(this.client));
                        }
                        this.$api.refreshUserInfo({...this.client});
                        this.$router.push('/payment_success');
                    })
                    .catch(error => this.message = error.message);
            }
        },
        computed: {
            cartHasProducts() {
                return this.$store.getters.cartHasProducts;
            },
            cart() {
                return this.$store.getters.cart;
            },
            client() {
                return this.$store.getters.client;
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