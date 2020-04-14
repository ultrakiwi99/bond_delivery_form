<template>
    <div class="cart app-section">
        <h3>Заказ</h3>
        <ul class="products">
            <li :key="idx" v-for="(product,idx) in cartProducts">
                <div class="product-row">
                    <div class="product">
                        <ProductName :product="product"/>
                        <div v-if="product.mods.length > 0">
                            <ul class="mods">
                                <li :key="idx" v-for="(mod,idx) in product.mods">
                                    {{ mod.name }}
                                    <span v-if="hasVariants(mod)">{{ variantsString(mod) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="price">
                        <span>{{ product.price }}</span>
                        <span @click="$emit('remove', idx)" class="delete-icon">&times;</span>
                    </div>
                </div>
            </li>
        </ul>
        <hr>
        <h4>Итого: {{ total }} р.</h4>
    </div>
</template>

<script>
    import ProductName from "@/components/Visual/ProductName";

    export default {
        name: "Cart",
        components: {ProductName},
        props: {
            cartProducts: Array
        },
        methods: {
            hasVariants(mod) {
                return mod.variants && mod.variants.selected && mod.variants.selected.length > 0;
            },
            variantsString(mod) {
                return `: ` + mod.variants.selected.join(', ');
            }
        },
        computed: {
            total() {
                return this.cartProducts.reduce((carry, product) => carry + product.price, 0);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cart {
        .product-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;

            .mods {
                list-style: none;

                li {
                    font-size: 0.8rem;
                    color: lightslategrey;
                }
            }

            .price {
                width: 25%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;

                .delete-icon {
                    display: block;
                    font-size: 1.5rem;
                    line-height: 2rem;
                    cursor: pointer;
                    color: darkred;
                }
            }

        }
    }
</style>