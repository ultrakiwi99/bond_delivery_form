<template>
    <SingleRowContainer>
        <h3>Заказ</h3>
        <div :key="idx" v-for="(product, idx) in cartProducts">
            <div class="row" style="margin-bottom: 1rem">
                <div class="col-sm-9">
                    {{ product.size.name }} {{ product.name }}
                    <span v-if="product.milk && product.milk.name !== 'Без молока'">
                        <br>Молоко: {{ product.milk.name}}<br>
                    </span>
                    <ul v-if="product.mods && product.mods.length > 0">
                        <li :key="idx" v-for="(mod, idx) in product.mods">
                            {{ mod.name }}
                        </li>
                    </ul>
                </div>
                <div @click="$emit('remove', idx)" class="col-sm-3" style="cursor: pointer">
                    <span class="primary-text">{{ product.price }} р.</span>
                    <span class="danger-text">&times;</span>
                </div>
            </div>
        </div>
        <hr>
        <h4>Итого: {{ total }} р.</h4>
    </SingleRowContainer>
</template>

<script>
    import SingleRowContainer from "@/components/Visual/SingleRowContainer";

    export default {
        name: "Cart",
        components: {SingleRowContainer},
        props: {
            cartProducts: Array
        },
        computed: {
            total() {
                return this.cartProducts.reduce((carry, product) => carry + product.price, 0);
            }
        }
    }
</script>

<style scoped>

</style>