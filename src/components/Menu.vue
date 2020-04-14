<template>
    <div>
        <SendEmailResult :message="message" @reset="reset" v-if="message"/>
        <div v-else>
            <Hero title="Заказ Доставки"/>
            <Categories :category-names="categoryNames" @select="selectCategory">
                <MenuCard
                        :idx="idx"
                        :qty-in-cart="qtyInCart(product)"
                        :sum-in-cart="sumInCart(product)"
                        :key="idx"
                        :name="product.name"
                        @select="selectProduct"
                        v-for="(product, idx) in menu[categoryIdx].products">
                    <Collapsable :selected-idx="idx" :visible-idx="productIdx">
                        <MenuDetails :product="product" @toCart="addToCart"/>
                    </Collapsable>
                </MenuCard>
            </Categories>
            <Cart :cart-products="cart" @remove="removeFromCart" v-if="cartHasProducts"/>
            <StoreSelector v-model="store"/>
            <Checkout :client="client" @makeOrder="sendOrderEmail" v-if="cartHasProducts"/>
        </div>
    </div>
</template>

<script>
    import MenuCard from "@/components/Menu/MenuCard";
    import Hero from "@/components/Hero";
    import Cart from "@/components/Cart";
    import Checkout from "@/components/Checkout/Checkout";
    import StoreSelector from "@/components/Store/StoreSelector";
    import SendEmailResult from "@/components/SendEmailResult";
    import Categories from "@/components/Categories/Categories";
    import Collapsable from "@/components/Visual/Collapsable";
    import MenuDetails from "@/components/Menu/MenuDetails";

    export default {
        name: 'Menu',
        components: {
            MenuDetails,
            Collapsable,
            Categories,
            StoreSelector,
            Checkout,
            Cart,
            Hero,
            MenuCard,
            SendEmailResult
        },
        mounted() {
            try {
                const savedStore = localStorage.getItem('lastSelectedStore');
                if (savedStore) {
                    this.store = JSON.parse(savedStore);
                }

                const savedAddress = localStorage.getItem('lastClientAddress');
                if (savedAddress) {
                    this.client.address = savedAddress;
                }
            } catch (e) {
                console.log('Exception: ', e);
            }

            const queryString = window.location.search;
            if (queryString) {
                const urlParams = new URLSearchParams(queryString);
                this.client.card = urlParams.get('client_card');
                this.client.name = urlParams.get('client_name');
                this.client.phone = urlParams.get('client_phone');
            }
        },
        data: () => ({
            menu: [
                {
                    name: 'Основное меню',
                    products: [
                        {
                            id: '1234-aaa-3333',
                            name: 'Капучино',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 99, selected: false},
                                {short: "MEDIA", name: "Средний", price: 128, selected: true},
                                {short: "GRANDE", name: "Большой", price: 157, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3334',
                            name: 'Латте',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 99, selected: false},
                                {short: "MEDIA", name: "Средний", price: 128, selected: true},
                                {short: "GRANDE", name: "Большой", price: 157, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3335',
                            name: 'Американо',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 79, selected: false},
                                {short: "MEDIA", name: "Средний", price: 108, selected: true},
                                {short: "GRANDE", name: "Большой", price: 137, selected: false}
                            ],
                            modifiers: [
                                {name: 'Сливки (50 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Молоко (50 гр)', price: 19, selected: false, comment: ''},
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3336',
                            name: 'Эспрессо',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 69, selected: false},
                                {short: "DBL", name: "Средний", price: 89, selected: true},
                                {short: "QTR", name: "Большой", price: 128, selected: false}
                            ],
                            modifiers: [
                                {name: 'Сливки (50 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Молоко (50 гр)', price: 19, selected: false, comment: ''},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3337',
                            name: 'Раф',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 129, selected: false},
                                {short: "MEDIA", name: "Средний", price: 158, selected: true},
                                {short: "GRANDE", name: "Большой", price: 187, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                },
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''}
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3338',
                            name: 'Флэт Уайт',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 118, selected: false},
                                {short: "MEDIA", name: "Средний", price: 138, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3339',
                            name: 'Кофе по-Венски',
                            comment: '',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 159, selected: true},
                                {short: "GRANDE", name: "Большой", price: 188, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3340',
                            name: 'Кофе Мокко',
                            comment: '',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 159, selected: true},
                                {short: "GRANDE", name: "Большой", price: 188, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3341',
                            name: 'Какао',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 99, selected: false},
                                {short: "MEDIA", name: "Средний", price: 129, selected: true},
                                {short: "GRANDE", name: "Большой", price: 149, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-aaa-3342',
                            name: 'Горячий шоколад',
                            comment: '',
                            sizes: [
                                {short: "UNO", name: "Маленький", price: 149, selected: false},
                                {short: "MEDIA", name: "Средний", price: 178, selected: true},
                                {short: "GRANDE", name: "Большой", price: 197, selected: false}
                            ],
                            milks: [
                                {name: "Обычное", price: 0},
                                {name: "Банановое", price: 59},
                                {name: "Кокосовое", price: 59},
                                {name: "Соевое", price: 59},
                                {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false
                                }
                            ],
                            visible: false
                        }
                    ]
                },
                {
                    name: 'Вкусняшки',
                    products: [
                        {
                            id: '1234-kkkk-0001',
                            name: 'Сердечко вафельное со сгущенкой',
                            comment: 'Вафельное сердечко с нежной варёной сгущенкой, орехами и глазурью.',
                            sizes: [
                                {short: "Шоколадное", name: "Шоколадное", price: 79, selected: false},
                                {short: "Клубничное", name: "Розовое", price: 79, selected: true},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0002',
                            name: 'Вафельная трубочка со сгущенкой',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 55, selected: true},
                            ],
                            comment: 'Вафельная трубочка с нежной варёной сгущенкой.',
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0003',
                            name: 'Орешки со сгущёнкой',
                            sizes: [
                                {short: "упаковка 3 шт", name: "упаковка 3 шт", price: 55, selected: true},
                            ],
                            comment: 'Три орешка с варёной сгущенкой. Как в детстве!',
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0004',
                            name: 'Кокосовая печенька',
                            comment: 'Вкусная печенька из кокосовой стружки. Райское наслаждение!',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 38, selected: true},
                                {short: "3 шт", name: "3 шт", price: 89, selected: false},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0005',
                            name: 'Большое ореховое печенье',
                            comment: 'Большое печенье с Лесным Орехом и Арахисом.',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 49, selected: true},
                                {short: "3 шт", name: "3 шт", price: 118, selected: false},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0006',
                            name: 'Конфета Кокосовая с Ананасом',
                            comment: 'Кокосовая с Анонасом в Белой глазури.',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 35, selected: true},
                                {short: "3 шт", name: "3 шт", price: 99, selected: false},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0007',
                            name: 'Конфета Кокосовая с Клюквой',
                            comment: 'Конфета Кокосовая с Клюквой в тёмной глазури.',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 35, selected: true},
                                {short: "3 шт", name: "3 шт", price: 99, selected: false},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0008',
                            name: 'Конфета Кокосовая с Вишней',
                            comment: 'Конфета Кокосовая с Вишней в тёмной глазури.',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 35, selected: true},
                                {short: "3 шт", name: "3 шт", price: 99, selected: false},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0008',
                            name: 'Конфета Медовая с Хлопьями',
                            comment: 'Конфета Медовая с Кукурузными хлопьями в темной глазури.',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 35, selected: true},
                                {short: "3 шт", name: "3 шт", price: 99, selected: false},
                            ],
                            visible: false
                        },
                        {
                            id: '1234-kkkk-0009',
                            name: 'Конфета Медовая с Орехом',
                            comment: 'Конфета Медовая с Орехом в тёмной глазури.',
                            sizes: [
                                {short: "1 шт", name: "1 шт", price: 35, selected: true},
                                {short: "3 шт", name: "3 шт", price: 99, selected: false},
                            ],
                            visible: false
                        }

                    ]
                },
                {
                    name: 'Фирменное меню',
                    products: [
                        {
                            id: '1234-ffff-3338',
                            name: 'Пряный Капучино',
                            comment: 'Эспрессо, Молоко, Сироп Фисташка, Карамон, Соль',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 168, selected: false},
                                {short: "GRANDE", name: "Большой", price: 197, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3339',
                            name: 'Ежевика в Шоколаде',
                            comment: 'Эспрессо, Молоко, Какао, Сиропы: Ежевика и Шоколадное Печенье',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 168, selected: false},
                                {short: "GRANDE", name: "Большой", price: 197, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-33340',
                            name: 'Латте Сливочный Банан',
                            comment: 'Эспрессо, Молоко, Сливки, Взбитые сливки, Сиропы Банан и Брауни',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 168, selected: false},
                                {short: "GRANDE", name: "Большой", price: 197, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3341',
                            name: 'Ванильный Крем-Латте',
                            comment: 'Эспрессо, Молоко, Сливки, Сиропы Персик и Французская ваниль',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 168, selected: false},
                                {short: "GRANDE", name: "Большой", price: 197, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3342',
                            name: 'Флэт Кортадо Бон',
                            comment: 'Два Эспрессо, Топлёное молоко, Сироп Нуга',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 188, selected: true},
                            ],
                            milks: [
                                {name: "Топлёное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3343',
                            name: 'Баунти Флэт',
                            comment: 'Два Эспрессо, Молоко, Какао, Сироп кокос, Кокосовая Стружка',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 188, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3344',
                            name: 'РАФ Канзас',
                            comment: 'Эспрессо, Молоко, Арахисовая Паста, Сироп Поп-Корн',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 168, selected: false},
                                {short: "GRANDE", name: "Большой", price: 197, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3345',
                            name: 'РАФ Классический',
                            comment: 'Эспрессо, Молоко, Сливки, Ванильный Сахар',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 168, selected: false},
                                {short: "GRANDE", name: "Большой", price: 197, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ffff-3346',
                            name: 'Матча Латте',
                            comment: 'Молоко, Сиропы Матча и Фисташка',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 128, selected: false},
                                {short: "GRANDE", name: "Большой", price: 157, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                    ]
                },
                {
                    name: 'Сезонное Меню',
                    products: [
                        {
                            id: '1234-ssss-3346',
                            name: 'Неправильные Пчёлы',
                            comment: '',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 158, selected: false},
                                {short: "GRANDE", name: "Большой", price: 179, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ssss-3348',
                            name: 'Инди-Латтэ',
                            comment: '',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 138, selected: false},
                                {short: "GRANDE", name: "Большой", price: 169, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        },
                        {
                            id: '1234-ssss-3347',
                            name: 'Клуб Романтики',
                            comment: '',
                            sizes: [
                                {short: "MEDIA", name: "Средний", price: 178, selected: false},
                                {short: "GRANDE", name: "Большой", price: 199, selected: true},
                            ],
                            milks: [
                                {name: "Обычное", price: 0}, {name: "Банановое", price: 59}, {name: "Кокосовое", price: 59}, {name: "Соевое", price: 59}, {name: "Овсяное", price: 59}
                            ],
                            modifiers: [
                                {name: 'Взбитые сливки', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу белые (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Маршмеллоу цветные (20 гр)', price: 29, selected: false, comment: ''},
                                {name: 'Доп. эспрессо', price: 39, selected: false, comment: ''},
                                {
                                    name: 'Сироп',
                                    price: 29,
                                    selected: false,
                                    comment: 'В комментариях укажите какой сироп.'
                                }
                            ],
                            visible: false
                        }
                    ]  
                }
            ],
            categoryIdx: 0,
            productIdx: null,
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
                this.message = null;
            },
            selectCategory(idx) {
                this.productIdx = null;
                this.categoryIdx = idx;
            },
            selectProduct(idx) {
                this.productIdx = idx === this.productIdx ? null : idx;
            },
            addToCart(product) {
                this.cart.push(product);
            },
            removeFromCart(removeIdx) {
                this.cart = this.cart.filter((prod, idx) => idx !== removeIdx);
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
            sendOrderEmail() {

                try {
                    localStorage.setItem('lastClientAddress', this.client.address);
                } catch (e) {
                    console.log('Exception: ',e);
                }

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
            },
            categoryNames() {
                return this.menu.map(category => category.name);
            }
        }
    };
</script>
