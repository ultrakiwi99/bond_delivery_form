<template>
    <div>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "ClientAutofill",
        props: {
            value: Object
        },
        mounted() {
            const queryString = window.location.search;
            if (queryString) {
                const urlParams = new URLSearchParams(queryString);
                this.$emit('input', {
                    ...this.value,
                    card: urlParams.get('client_card'),
                    name: urlParams.get('client_name'),
                    phone: urlParams.get('client_phone')
                });
            }
            if (localStorage) {
                const savedAddress = localStorage.getItem('lastClientAddress');
                if (savedAddress) {
                    this.$emit('input', {...this.value, address: savedAddress});
                }
            }
        },
    }
</script>