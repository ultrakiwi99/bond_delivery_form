<template>
    <div class="container">
        <Hero title="КофеБон"/>
        <MenuCard
                :key="product.name"
                :product="product"
                :qty-in-cart="qtyInCart(product)"
                :sum-in-cart="sumInCart(product)"
                @makeVisible="makeVisibleCard"
                @toCart="addToCart"
                v-for="product in menu"/>
        <Cart :cart-products="cart" @remove="removeFromCart" v-if="cartHasProducts"/>
        <StoreSelector :selected="store" @select="setStore"/>
        <Checkout :client="client" v-if="cartHasProducts"/>
    </div>
</template>

<script>
    import MenuCard from "@/components/MenuCard";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";
    import Checkout from "@/components/Checkout";
    import StoreSelector from "@/components/StoreSelector";

    export default {
        name: 'Menu',
        components: {StoreSelector, Checkout, Cart, Hero, MenuCard},
        mounted() {
            if (this.$route.query) {
                const query = this.$route.query;

                this.client.card = query.client_card ? query.client_card : null;
                this.client.name = query.client_name ? query.client_name : null;
                this.client.phone = query.client_phone ? query.client_phone : null;
            }
        },
        data: () => ({
            menu: [
                {
                    id: '1234-aaa-3333',
                    name: 'Американо',
                    comment: 'Кофе. Вкусный как мясо, берите не пожалеете!',
                    sizes: [
                        {
                            short: "S",
                            name: "Маленький",
                            price: 110,
                            selected: true
                        },
                        {
                            short: "M",
                            name: "Средний",
                            price: 120,
                            selected: false
                        },
                        {
                            short: "L",
                            name: "Большой",
                            price: 150,
                            selected: false
                        }
                    ],
                    milks: [
                        {
                            name: "Без молока",
                            price: 0
                        },
                        {
                            name: "Обычное",
                            price: 0
                        },
                        {
                            name: "Банановое",
                            price: 40
                        },
                        {
                            name: "Овсяное",
                            price: 60
                        }
                    ],
                    modifiers: [
                        {
                            name: 'Сахар',
                            price: 10,
                            selected: false,
                            comment: 'Пишите в комментарий заказа сколько ложек.'
                        },
                        {
                            name: 'Сироп',
                            price: 50,
                            selected: false,
                            comment: 'Кленовый, бананаовый, карамельный - пишите в комментарий какой.'
                        }
                    ],
                    visible: false
                },
                {
                    id: '1234-aab-4443',
                    name: 'Капучино',
                    milks: [
                        {
                            name: "Обычное",
                            price: 0
                        },
                        {
                            name: "Банановое",
                            price: 40
                        },
                        {
                            name: "Овсяное",
                            price: 60
                        }
                    ],
                    sizes: [
                        {
                            short: "S",
                            name: "Маленький",
                            price: 110,
                            selected: true
                        },
                        {
                            short: "M",
                            name: "Средний",
                            price: 120,
                            selected: false
                        },
                        {
                            short: "L",
                            name: "Большой",
                            price: 150,
                            selected: false
                        },
                        {
                            short: "G",
                            name: "Гранде",
                            price: 180,
                            selected: false
                        }
                    ],
                    modifiers: [
                        {
                            name: 'Маршмеллоу',
                            price: 5,
                            selected: false
                        },
                        {
                            name: 'Сахар',
                            price: 10,
                            selected: false
                        }
                    ],
                    visible: false
                },
                {
                    id: '1334-4aa-3f33',
                    name: 'Эспрессо',
                    sizes: [
                        {
                            short: "S",
                            name: "Маленький",
                            price: 110,
                            selected: true
                        },
                        {
                            short: "M",
                            name: "Средний",
                            price: 120,
                            selected: false
                        }
                    ],
                    modifiers: [
                        {
                            name: 'Сахар',
                            price: 10,
                            selected: false
                        }
                    ],
                    visible: false
                }
            ],
            cart: [],
            store: null,
            client: {
                card: null,
                name: null,
                phone: null,
                address: null,
                comment: null
            }
        }),
        methods: {
            addToCart(product) {
                this.cart.push(product);
            },
            removeFromCart(removeIdx) {
                this.cart = this.cart.filter((prod, idx) => idx !== removeIdx);
            },
            makeVisibleCard(productId) {
                this.menu.forEach(product => {
                    if (product.id === productId) {
                        product.visible = !product.visible;
                    } else {
                        product.visible = false;
                    }
                });
            },
            cartProductsByProduct(product) {
                return this.cart.filter(cartProduct => cartProduct.name === product.name)
            },
            isInCart(product) {
                return this.qtyInCart(product) > 0;
            },
            qtyInCart(product) {
                return this.cartProductsByProduct(product).length;
            },
            sumInCart(product) {
                return this.cartProductsByProduct(product).reduce((carry, product) => carry + product.price, 0);
            },
            setStore(store) {
                this.store = store;
            }
        },
        computed: {
            cartHasProducts() {
                return this.cart.length > 0;
            }
        }
    };
</script>

<style>
    .primary-text {
        color: #1976d2;
    }

    .secondary-text {
        color: lightslategrey;
    }

    .danger-text {
        color: darkred;
    }
</style>