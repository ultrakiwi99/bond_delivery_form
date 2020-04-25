<template>
    <div>
        <h2>Оформить заказ</h2>
        <ClientAutofill :client="client" @fill="setClient">
            <StoreSelector v-model="store"/>
            <CheckoutForm :client="client"/>
            <button @click="sendOrderEmail" role="button">Заказать</button>
        </ClientAutofill>
    </div>
</template>

<script>
    import ClientAutofill from "@/components/Client/ClientAutofill";
    import StoreSelector from "@/components/Store/StoreSelector";
    import CheckoutForm from "@/components/Checkout/CheckoutForm";

    export default {
        name: "Checkout",
        components: {ClientAutofill, StoreSelector, CheckoutForm},
        data: () => ({
            client: {
                card: null,
                name: null,
                phone: null,
                address: null,
                comment: null,
                lastStore: null
            },
            store: null
        }),
        methods: {
            sendOrderEmail() {
                if (!this.store) {
                    return;
                }

                this.$api
                    .sendOrder(this.client, this.store, this.cart)
                    .then(() => {
                        this.message = 'Ваш Заказ принят. Ожидайте звонка для подтверждения.';
                        this.client.lastStore = JSON.stringify(this.store);
                        if (localStorage) {
                            localStorage.setItem('lastClientInfo', JSON.stringify(this.client));
                        }
                        this.$api.refreshUserInfo({...this.client});
                    })
                    .catch(error => this.message = error.message);
            },
            setClient(client) {
                this.client = client;
                if (client.lastStore) {
                    this.store = client.lastStore;
                }
            }
        }
    }
</script>

<style scoped>
    h2 {
        text-align: center;
    }
</style>