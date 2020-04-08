<template>
    <span>
        {{ product.size.name }} {{ product.name }}<span v-if="hasMilk">, Молоко {{ product.milk.name }}</span>
    </span>
</template>

<script>
    export default {
        name: "ProductName",
        props: {
            product: Object
        },
        computed: {
            hasMilk() {
                return this.product.milk && this.product.milk.name !== 'Без молока';
            }
        }
    }
</script>

<style scoped>

</style>