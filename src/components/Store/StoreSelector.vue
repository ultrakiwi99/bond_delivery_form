<template>
    <form class="store-selector">
        <select v-model="selected">
            <option :value="null">--- Выберите кофейню</option>
            <option :key="store.name" :value="store" v-for="store in stores">
                {{ store.name }}
            </option>
        </select>
        <div class="container" v-if="selected">
            <div @click="mapVisible = !mapVisible" class="primary-text">
                {{ mapVisible ? 'СКРЫТЬ КАРТУ' : 'ПОКАЗАТЬ КАРТУ'}}
            </div>
            <img :src="selected.link" alt="Карта доставки КБ" v-if="selected && mapVisible"/>
        </div>
        <div class="container">
            <ul>
                <li>
                    Доставка до адреса - 80р.
                </li>
                <li>
                    При заказе от 400р. доставка - БЕСПЛАТНО
                </li>
                <li>
                    Если курьер сделал менее 20 шагов до места доставки - доставка бесплатно!
                </li>
            </ul>
        </div>
    </form>
</template>

<script>
    export default {
        name: "StoreSelector",
        props: {
            value: {
                type: Object,
                default: null
            }
        },
        created() {
            const lastStore = this.$store.getters.lastStore;
            if (lastStore) {
                this.selected = lastStore;
            }
        },
        data: () => ({
            selected: null,
            mapVisible: false,
            stores: [
                {
                    name: `м. Черная Речка, Карельский пер., 3Б`,
                    link: `http://www.coffeebon.ru/delivery/img/kb6.jpg`
                },
                {
                    name: `м. Площадь Ленина, ул. Академика Лебедева, 7`,
                    link: `http://www.coffeebon.ru/delivery/img/kb10.jpg`
                },
                {
                    name: `м. Площадь Восстания, Греческий пр., 19`,
                    link: `http://www.coffeebon.ru/delivery/img/kb17.jpg`
                },
                {
                    name: `м. Чернышевская, Моховая ул., 26`,
                    link: `http://www.coffeebon.ru/delivery/img/kb18.jpg`
                },
                {
                    name: `м. Невский проспект, Ломоносова ул., 1`,
                    link: `http://www.coffeebon.ru/delivery/img/kb16.jpg`
                },
                {
                    name: `м. Сенная площадь, ул. Декабристов, 46`,
                    link: `http://www.coffeebon.ru/delivery/img/kb33.jpg`
                },
                {
                    name: `м. Автово, Автовская ул., 3`,
                    link: `http://www.coffeebon.ru/delivery/img/kb28.jpg`
                },
                {
                    name: `м. Московские Ворота, Московский пр., 130`,
                    link: `http://www.coffeebon.ru/delivery/img/kb11.jpg`
                },
                {
                    name: `м. Нарвская, Старопетергофский, 42`,
                    link: `http://www.coffeebon.ru/delivery/img/kb25.jpg`
                },
                {
                    name: `м. Лесная, Большой Сампсониевский пр., 80`,
                    link: `http://www.coffeebon.ru/delivery/img/kb23.jpg`
                },
                {
                    name: `м. Комендантский пр, ул. Шаврова 9А`,
                    link: `http://www.coffeebon.ru/delivery/img/kb12.jpg`
                },
                {
                    name: `м. Комендантский пр, ул. Уточкина, 6`,
                    link: `http://www.coffeebon.ru/delivery/img/kb34.jpg`
                },
                {
                    name: `м. Беговая, ул. Туристская, 24/42`,
                    link: `http://www.coffeebon.ru/delivery/img/kb29.jpg`
                },
                {
                    name: `м. Новочеркасская, Заневский пр., 20`,
                    link: `http://www.coffeebon.ru/delivery/img/kb2.jpg`
                },
                {
                    name: `м. Новочеркасская, Стахановцев, 10`,
                    link: `http://www.coffeebon.ru/delivery/img/kb1.jpg`
                },
                {
                    name: `м. Горьковская, ул. Малая Посадская, 19`,
                    link: `http://www.coffeebon.ru/delivery/img/kb3.jpg`
                },
                {
                    name: `м. Горьковская, ул. Чапаева 15`,
                    link: `http://www.coffeebon.ru/delivery/img/kb21.jpg`
                },
                {
                    name: `м. Чкаловская, Пионерская, 21`,
                    link: `http://www.coffeebon.ru/delivery/img/kb19.jpg`
                },
                {
                    name: `м. Петроградская, Аптекарский проспект., 2`,
                    link: `http://www.coffeebon.ru/delivery/img/kb14.jpg`
                },
                {
                    name: `м. Пионерская, Богатырский пр., 5/1`,
                    link: `http://www.coffeebon.ru/delivery/img/kb26.jpg`
                },
                {
                    name: `м. Чёрная Речка, Ланское шоссе, 5`,
                    link: `http://www.coffeebon.ru/delivery/img/kb27.jpg`
                },
                {
                    name: `м. Проспект Просвещения, ул. Композиторов, 12`,
                    link: `http://www.coffeebon.ru/delivery/img/kb36.jpg`
                },
                {
                    name: `м. Приморская, ул. Наличная, 40`,
                    link: `http://www.coffeebon.ru/delivery/img/kb7.jpg`
                },
                {
                    name: `м. Приморская, Наличная 35`,
                    link: `http://www.coffeebon.ru/delivery/img/kb9.jpg`
                },
                {
                    name: `м. Приморская, Наличная 38к2`,
                    link: `http://www.coffeebon.ru/delivery/img/kb22.jpg`
                },
                {
                    name: `м. Приморская, Средний пр., 100`,
                    link: `http://www.coffeebon.ru/delivery/img/kb20.jpg`
                },
                {
                    name: `м. Василеостровская, 22-я Линия В.О., 5`,
                    link: `http://www.coffeebon.ru/delivery/img/kb15.jpg`
                },
                {
                    name: `м. Василеостровская, Средний пр., 67`,
                    link: `http://www.coffeebon.ru/delivery/img/kb38.jpg`
                },
                {
                    name: `м. Василеостровская, 6-я линия В.О. 45`,
                    link: `http://www.coffeebon.ru/delivery/img/kb32.jpg`
                },
                {
                    name: `м. Спортивная, Малый проспект П.С., 1`,
                    link: `http://www.coffeebon.ru/delivery/img/kb13.jpg`
                }
            ]
        }),
        watch: {
            selected() {
                if (this.selected) {
                    this.$store.commit('updateStore', this.selected);
                }
            }
        },
    }
</script>