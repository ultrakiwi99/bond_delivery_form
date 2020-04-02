<template>
    <section class="container">
        <section class="col">
            <Hero title="КофеБон"/>
            <MenuCard
                    v-for="product in menu"
                    :key="product.name"
                    :product="product"
                    @toCart="addToCart"
            />
            <Cart v-if="cartHasProducts" :cart-products="cart" @fromCart="removeFromCart"/>
            <Checkout v-if="cartHasProducts" :client="client"/>
        </section>
    </section>
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
                    price: 17,
                    comment: 'Комментарий к продукту.',
                    modifiers: [
                        {
                            name: 'Молоко',
                            price: 10,
                            selected: false
                        },
                        {
                            name: 'Сахар',
                            price: 10,
                            selected: false,
                            comment: 'Пишите в комментарий заказа сколько ложек.'
                        }
                    ],
                    inCart: 0
                },
                {
                    id: '1234-aab-4443',
                    name: 'Capuchino',
                    price: 20,
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
                    inCart: 0
                },
                {
                    id: '1334-4aa-3f33',
                    name: 'Espresso',
                    price: 15,
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
                    inCart: 0
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
