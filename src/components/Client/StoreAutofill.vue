<template>
    <div>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "StoreAutofill",
        props: {
            value: Object
        },
        mounted() {
            if (localStorage) {
                const savedStore = localStorage.getItem('lastSelectedStore');
                if (savedStore) {
                    this.$emit('input', JSON.parse(savedStore));
                }
            }
        }
    }
</script>

<style scoped>

</style>