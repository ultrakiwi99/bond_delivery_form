<template>
    <form>
        <select @input="selectStore" required style="width: 100%;">
            <option :selected="!selected" :value="null">Кофейня не выбрана</option>
            <option :key="idx" v-for="(store, idx) in stores">
                {{ store.name }}
            </option>
        </select>
        <div class="container" v-if="selected">
            <a :href="selectedStoreMap" class="primary-text" target="_blank">КАРТА</a>
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
            selected: Object
        },
        data: () => ({
            stores: [
                {
                    name: `м. Черная Речка, Карельский пер., 3Б`,
                    link: `http://www.coffeebon.ru/delivery/img/kb6.jpg`
                },
                {
                    name: `м. Финляндский Вокзал, ул. Академика Лебедева, 7`,
                    link: `http://www.coffeebon.ru/delivery/img/kb10.jpg`
                },
                {
                    name: `м. Площадь Восстания, Греческий пр., 19`,
                    link: `http://www.coffeebon.ru/delivery/img/kb17.jpg`
                },
                {
                    name: `м. Московские Ворота, Московский пр., 130`,
                    link: `http://www.coffeebon.ru/delivery/img/kb11.jpg`
                },
                {
                    name: `м. Василеостровская, Средний пр., 67`,
                    link: `http://www.coffeebon.ru/delivery/img/kb38.jpg`
                },
                {
                    name: `м. Лесная, Большой Сампсониевский пр., 80`,
                    link: `http://www.coffeebon.ru/delivery/img/kb23.jpg`
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
                    name: `м. Горьковская, ул. Малая Посадская, 19`,
                    link: `http://www.coffeebon.ru/delivery/img/kb3.jpg`
                },
                {
                    name: `м. Приморская, ул. Наличная, 40`,
                    link: `http://www.coffeebon.ru/delivery/img/kb7.jpg`
                },
                {
                    name: `м. Спортивная, Малый проспект П.С., 1`,
                    link: `http://www.coffeebon.ru/delivery/img/kb13.jpg`
                },
                {
                    name: `м. Проспект Просвещения, ул. Композиторов, 12`,
                    link: `http://www.coffeebon.ru/delivery/img/kb36.jpg`
                }
            ]
        }),
        methods: {
            selectStore(event) {
                const name = event.target.value;
                console.log(name);
                if (name === null) {
                    return;
                }
                this.$emit('select', this.stores.find(store => store.name === name));
            }
        },
        computed: {
            selectedStoreMap() {
                return this.selected.link;
            }
        }
    }
</script>

<style scoped>

</style>