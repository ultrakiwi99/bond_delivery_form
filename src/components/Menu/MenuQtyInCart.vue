<template>
    <span v-if="qtyInCart > 0">{{ qtyInCart }} на {{ sumInCart }} р.</span>
</template>

<script>
    export default {
        name: "MenuQtyInCart",
        props: {
            qtyInCart: Number,
            sumInCart: Number
        }
    }
</script>

<style scoped>

</style>