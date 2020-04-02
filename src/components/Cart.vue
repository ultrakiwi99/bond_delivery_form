<template>
    <v-container>
        <h3>Заказ</h3>
        <v-container>
            <div class="cart-row" v-for="(product, id) in cartProducts" :key="id">
                <span>{{ product.name }}</span>
                <span>{{ product.qty}} x {{ product.itemTotal }}&nbsp;&nbsp;
                    <strong style="cursor: pointer" @click="$emit('fromCart', product)">&times;</strong>
                </span>
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
    .cart-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>