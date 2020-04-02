<template>
    <v-container>
        <h3>Заказ</h3>
        <v-container>
            <div v-for="(product, idx) in cartProducts" :key="idx">
                <span>product.name</span>
                <span><v-icon>fas fa-bin</v-icon></span>
            </div>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "Cart",
        props: {
            cartProducts: Array
        }
    }
</script>

<style scoped>

</style>