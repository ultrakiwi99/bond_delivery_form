<template>
    <v-container>
        <Hero title="КофеБон"/>
        <MenuCard
                v-for="product in menu"
                :key="product.name"
                :product="product"
                @toCart="addToCart"
        />
        <Cart/>
        <Checkout/>
    </v-container>
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
            cart: []
        }),
        methods: {
            addToCart(product) {
                const {name} = product;
                const total  = product.price
                    + product.modifiers
                        .reduce((carry, mod) => mod.selected ? carry + mod.price : carry, 0);
                
            }
        }
    };
</script>
