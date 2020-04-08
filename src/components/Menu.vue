<template>
    <div>
        <SendEmailResult :message="message" @reset="reset" v-if="message"/>
        <div v-else>
            <Hero title="Заказ"/>
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
            <Checkout :client="client" @makeOrder="sendOrderEmail" v-if="cartHasProducts"/>
        </div>
    </div>
</template>

<script>
    import MenuCard from "@/components/MenuCard";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";
    import Checkout from "@/components/Checkout";
    import StoreSelector from "@/components/StoreSelector";
    import SendEmailResult from "@/components/SendEmailResult";

    export default {
        name: 'Menu',
        components: {StoreSelector, Checkout, Cart, Hero, MenuCard, SendEmailResult},
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
                    name: 'Капучино',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 99,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 128, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 157, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3334',
                    name: 'Латте',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 99,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 128, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 157, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3335',
                    name: 'Американо',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 79,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 108, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 137, selected: false }
                    ],
                    modifiers: [
                        { name: 'Сливки (50 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Молоко (50 гр)', price: 19, selected: false, comment: '' },
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3336',
                    name: 'Эспрессо',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький",  price: 69,  selected: false },
                        { short: "DBL",  name: "Средний",   price: 89, selected: true },
                        { short: "QTR", name: "Большой",    price: 128, selected: false }
                    ],
                    modifiers: [
                        { name: 'Сливки (50 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Молоко (50 гр)', price: 19, selected: false, comment: '' },
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3337',
                    name: 'Раф',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 129,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 158, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 187, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Сироп (обязателен)', price: 0, selected: true, comment: 'В комментариях укажите какой сироп.' },
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3338',
                    name: 'Флэт Уайт',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 118,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 138, selected: true },
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3339',
                    name: 'Кофе по-Венски',
                    comment: '',
                    sizes: [
                        { short: "MEDIA",  name: "Средний",   price: 159, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 188, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3340',
                    name: 'Кофе Мокко',
                    comment: '',
                    sizes: [
                        { short: "MEDIA",  name: "Средний",   price: 159, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 188, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3341',
                    name: 'Какао',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 99,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 129, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 149, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
                    ],
                    visible: false
                },
                {
                    id: '1234-aaa-3342',
                    name: 'Горячий шоколад',
                    comment: '',
                    sizes: [
                        { short: "UNO",    name: "Маленький", price: 149,  selected: false },
                        { short: "MEDIA",  name: "Средний",   price: 178, selected: true },
                        { short: "GRANDE", name: "Большой",   price: 197, selected: false }
                    ],
                    milks: [
                        { name: "Обычное",   price: 0  },
                        { name: "Банановое", price: 59 },
                        { name: "Кокосовое", price: 59 },
                        { name: "Соевое",    price: 59 },
                        { name: "Овсяное",   price: 59 }
                    ],
                    modifiers: [
                        { name: 'Взбитые сливки', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: '' },
                        { name: 'Доп. эспрессо', price: 39, selected: false, comment: '' },
                        { name: 'Сироп', price: 29, selected: false, comment: 'В комментариях укажите какой сироп.' }
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
            },
            message: null
        }),
        methods: {
            reset() {
                this.cart = [];
                this.store = null;
                this.message = null;
            },
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
            },
            sendOrderEmail() {
                fetch('http://portal.coffeebon.ru:8084/api/delivery/send/mail', {
                    method: 'POST',
                    body: JSON.stringify({
                        client: {...this.client},
                        order: [...this.cart],
                        store: {...this.store}
                    })
                })
                    .then(response => response.json())
                    .then(json => {
                        if (json.result === 'error') {
                            throw Error(json.message);
                        }
                        this.message = 'Ваш Заказ принят. Ожидайте звонка для подтверждения.';
                    })
                    .catch(error => this.message = error.message);
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