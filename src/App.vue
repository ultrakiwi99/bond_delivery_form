<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <Hero title="КофеБон"/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <MenuCard
                        :key="product.name"
                        :product="product"
                        @makeVisible="makeVisibleCard"
                        @toCart="addToCart"
                        v-for="product in menu"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <Cart :cart-products="cart" @fromCart="removeFromCart" v-if="cartHasProducts"/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <Checkout :client="client" v-if="cartHasProducts"/>
            </div>
        </div>
    </div>
</template>

<script>
    import MenuCard from "@/components/MenuCard";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";
    import Checkout from "@/components/Checkout";

    export default {
        name: 'App',
        components: {Checkout, Cart, Hero, MenuCard},
        data: () => ({
            menu: [
                {
                    id: '1234-aaa-3333',
                    name: 'Americano',
                    comment: 'Комментарий к продукту.',
                    sizes: [
                        {
                            short: "S",
                            name: "Маленький",
                            price: 110
                        },
                        {
                            short: "M",
                            name: "Средний",
                            price: 120
                        },
                        {
                            short: "L",
                            name: "Большой",
                            price: 150
                        }
                    ],
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
                    syrup: [],
                    modifiers: [
                        {
                            name: 'Сахар',
                            price: 10,
                            selected: false,
                            comment: 'Пишите в комментарий заказа сколько ложек.'
                        }
                    ],
                    inCart: 0,
                    visible: false
                },
                {
                    id: '1234-aab-4443',
                    name: 'Capuchino',
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
                            price: 110
                        },
                        {
                            short: "M",
                            name: "Средний",
                            price: 120
                        },
                        {
                            short: "L",
                            name: "Большой",
                            price: 150
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
                    inCart: 0,
                    visible: false
                },
                {
                    id: '1334-4aa-3f33',
                    name: 'Espresso',
                    sizes: [
                        {
                            short: "S",
                            name: "Маленький",
                            price: 110
                        },
                        {
                            short: "M",
                            name: "Средний",
                            price: 120
                        },
                        {
                            short: "L",
                            name: "Большой",
                            price: 150
                        }
                    ],
                    modifiers: [
                        {
                            name: 'Молоко',
                            price: 10,
                            selected: false
                        },
                        {
                            name: 'Сахар',
                            price: 10,
                            selected: false
                        }
                    ],
                    inCart: 0,
                    visible: false
                }
            ],
            cart: [],
            client: {
                name: null,
                address: null,
                comment: null
            }
        }),
        methods: {
            addToCart(product) {
                const {id, name} = product;
                const total = product.price
                    + product.modifiers
                        .reduce((carry, mod) => mod.selected ? carry + mod.price : carry, 0);
                let inCart = false;


                for (let cartProduct of this.cart) {
                    if (cartProduct.id === id) {
                        cartProduct.qty++;
                        cartProduct.itemTotal += total;
                        inCart = true;
                    }
                }
                if (!inCart) {
                    this.cart.push({id, name, total, qty: 1, itemTotal: total});
                }
                this.addOneToMenu(product.id);
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
            removeFromCart(product) {
                this.cart = this.cart.filter(cartProduct => cartProduct.id !== product.id);
                this.removeOneFromMenu(product.id);
            },
            addOneToMenu(id) {
                for (let idx in this.menu) {
                    if (this.menu[idx].id === id) {
                        this.menu[idx].inCart++;
                    }
                }
            },
            removeOneFromMenu(id) {
                for (let idx in this.menu) {
                    if (this.menu[idx].id === id) {
                        this.menu[idx].inCart = 0;
                    }
                }
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
</style>