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
                const savedAddress = localStorage.getItem('lastClientAddress');
                if (savedAddress) {
                    this.$emit('fill', {...clientInfo, address: savedAddress});
                }
            }

            if (card) {
                this.$api
                    .getGuestInfo(card)
                    .then(client => this.$emit('fill', {...clientInfo, address: client.address}))
                    .catch(error => console.log(error));
            }
        },
    }
</script>