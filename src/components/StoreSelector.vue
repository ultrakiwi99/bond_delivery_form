<template>
    <div>
        <select @input="selectStore" required>
            <option :selected="!selected" :value="null">Кофейня не выбрана</option>
            <option :key="idx" v-for="(store, idx) in stores">
                {{ store.name }}
            </option>
        </select>
        <div class="container">
            <a :href="selectedStoreMap" class="primary-text" target="_blank">КАРТА</a>
        </div>
    </div>
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
                    name: `м. Черная Речка, Карельский пер., 3Б `,
                    link: `http://www.coffeebon.ru/delivery/img/kb6.jpg`
                },
                {
                    name: `м. Финляндский Вокзал, ул. Академика Лебедева, 7`
                },
                {
                    name: `м. Площадь Восстания, Греческий пр., 19`
                },
                {name: `м. Московские Ворота, Московский пр., 130`},
                {name: `м. Василеостровская, Средний пр., 67`},
                {name: `м. Лесная, Большой Сампсониевский пр., 80`},
                {name: `м. Комендантский пр, ул. Уточкина, 6`},
                {name: `м. Беговая, ул. Туристская, 24/42`},
                {name: `м. Новочеркасская, Заневский пр., 20`},
                {name: `м. Горьковская, ул. Малая Посадская, 19`},
                {name: `м. Приморская, ул. Наличная, 40`},
                {name: `м. Спортивная, Малый проспект П.С., 1`},
                {name: `м. Проспект Просвещения, ул. Композиторов, 12`}
            ]
        }),
        methods: {
            selectStore(event) {
                const name = event.target.value;
                if (name === null) {
                    return;
                }
                this.$emit('select', this.stores.find(store => store.name === name));
            }
        },
        computed: {
            selectedStoreMap() {
                return '';
            }
        }
    }
</script>

<style scoped>

</style>