<template>
    <div>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "ClientAutofill",
        props: {
            client: Object
        },
        beforeMount() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const card = urlParams.get('client_card');
            const name = urlParams.get('client_name');
            const phone = urlParams.get('client_phone');

            const clientInfo = {...this.client, card, name, phone};

            this.$emit('fill', clientInfo);

            if (localStorage) {
                const savedClient = localStorage.getItem('lastClientInfo');
                if (savedClient) {
                    const savedClientInfo = JSON.parse(savedClient);
                    console.log(savedClientInfo);
                    this.$emit('fill', {
                        ...clientInfo,
                        name: savedClientInfo.name,
                        phone: savedClientInfo.phone,
                        address: savedClientInfo.address
                    });
                }
            }

            if (card) {
                this.$api
                    .getGuestInfo(card)
                    .then(client => {
                        clientInfo.name = clientInfo.name ? clientInfo.name : client.name;
                        clientInfo.address = client.address;
                        clientInfo.lastStore = JSON.parse(client.lastStore);
                        this.$emit('fill', clientInfo);
                    })
                    .catch(error => console.log(error));
            }
        },
    }
</script>