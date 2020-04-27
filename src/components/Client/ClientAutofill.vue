<template>
    <div>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "ClientAutofill",
        created() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const card = urlParams.get('client_card');
            const name = urlParams.get('client_name');
            const phone = urlParams.get('client_phone');

            let clientInfo = {...this.client, card, name, phone};

            if (localStorage) {
                clientInfo = this.fromLocalStorage(clientInfo);
            }

            if (card) {
                this.$api
                    .getGuestInfo(card)
                    .then(client => clientInfo = this.formApiResponse(clientInfo, client))
                    .catch(error => console.log(error));
            }

            if (clientInfo.lastStore) {
                this.$store.commit('updateStore', clientInfo.lastStore);
            }

            this.$store.commit('updateClient', clientInfo);
        },
        methods: {
            fromLocalStorage(clientInfo) {
                const localStorageClient = localStorage.getItem('lastClientInfo');
                if (localStorageClient) {
                    const localStorageClientInfo = JSON.parse(localStorageClient);
                    clientInfo.name = localStorageClientInfo.name;
                    clientInfo.phone = localStorageClientInfo.phone;
                    clientInfo.address = localStorageClientInfo.address;
                    clientInfo.lastStore = JSON.parse(localStorageClientInfo.lastStore);
                }

                return clientInfo;
            },
            formApiResponse(clientInfo, response) {
                clientInfo.name = clientInfo.name ? clientInfo.name : response.name;
                clientInfo.address = response.address;
                clientInfo.lastStore = JSON.parse(response.lastStore);
            }
        }
    }
</script>