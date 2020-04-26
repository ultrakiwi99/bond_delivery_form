<template>
    <div class="cart app-section">
        <h3>Заказ</h3>
        <ol class="products">
            <li :key="idx" v-for="(product,idx) in cart">
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
                        <span @click="removeFromCart(product, idx)" class="delete-icon">&times;</span>
                    </div>
                </div>
                <div class="comment" v-if="product.comment">
                    {{ product.comment }}
                </div>
            </li>
        </ol>
        <hr>
        <h4>Итого: {{ total }} р.</h4>
        <FreeDeliveryInformer :total="cartTotal" v-if="cartHasProducts"/>
    </div>
</template>

<script>
    import ProductName from "@/components/Visual/ProductName";
    import FreeDeliveryInformer from "@/components/Checkout/FreeDeliveryInformer";

    export default {
        name: "Cart",
        components: {ProductName, FreeDeliveryInformer},
        methods: {
            hasVariants(mod) {
                return mod.variants && mod.variants.selected && mod.variants.selected.length > 0;
            },
            variantsString(mod) {
                return `: ` + mod.variants.selected.join(', ');
            },
            removeFromCart(product, productIdx) {
                this.$store.commit('removeFromCart', {product, productIdx});
            },
        },
        computed: {
            total() {
                return this.cart.reduce((carry, product) => carry + product.price, 0);
            },
            cart() {
                return this.$store.getters.cart;
            },
            cartHasProducts() {
                return this.cart.length > 0;
            },
            cartTotal() {
                return this.cart.reduce((carry, product) => carry + product.price, 0);
            },
            categoryNames() {
                return this.menu.map(category => category.name);
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
                    //font-size: 0.8rem;
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

        .comment {
            border-left: lightslategrey 3px solid;
            padding-left: 0.4rem;
            //font-size: 0.8rem;
            font-style: italic;
        }
    }
</style>