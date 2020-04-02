<template>
    <section class="card">
        <h3>Данные заказа</h3>
        <div class="cart-row" v-for="(product, id) in cartProducts" :key="id">
            <span style="flex: 1">{{ product.name }}</span>
            <span>{{ product.qty}} x {{ product.itemTotal }}</span>
            <span class="remove" @click="$emit('fromCart', product)">&times;</span>
        </div>
    </section>
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