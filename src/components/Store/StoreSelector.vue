<template>
    <form class="store-selector">
        <select v-model="selected">
            <option :value="null">--- Выберите кофейню</option>
            <option :key="store.name" :value="store" v-for="store in stores">
                {{ store.name }}
            </option>
        </select>
        <div class="ss_container" v-if="selected">
            <div @click="mapVisible = !mapVisible" class="primary-text">
                {{ mapVisible ? 'СКРЫТЬ КАРТУ' : 'ПОКАЗАТЬ КАРТУ'}}
            </div>
            <img :src="selected.link" alt="Карта доставки КБ" v-if="selected && mapVisible"/>
        </div>
        <div class="ss_container">
            <ul>
                <li>
                    Доставка до адреса - 80р.
                </li>
                <li>
                    При заказе от 400р. доставка - БЕСПЛАТНО
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
                    name: `м. Лесная, Большой Сампсониевский пр., 80`,
                    link: `/delivery/img/kb23.jpg`
                },
                {
                    name: `м. Комендантский пр, ул. Уточкина, 6`,
                    link: `/delivery/img/kb34.jpg`
                },
                {
                    name: `м. Беговая, ул. Туристская, 24/42`,
                    link: `/delivery/img/kb29.jpg`
                },
                {
                    name: `м. Новочеркасская, Заневский пр., 20`,
                    link: `/delivery/img/kb2.jpg`
                },
                {
                    name: `м. Новочеркасская, Стахановцев, 10`,
                    link: `/delivery/img/kb1.jpg`
                },
                {
                    name: `м. Петроградская, Аптекарский проспект., 2`,
                    link: `/delivery/img/kb14.jpg`
                },
                {
                    name: `м. Проспект Просвещения, ул. Композиторов, 12`,
                    link: `/delivery/img/kb36.jpg`
                },
                {
                    name: `м. Приморская, ул. Наличная, 40`,
                    link: `/delivery/img/kb7.jpg`
                },
                {
                    name: `м. Приморская, Наличная 35`,
                    link: `/delivery/img/kb9.jpg`
                },
                {
                    name: `м. Приморская, Наличная 38к2`,
                    link: `/delivery/img/kb22.jpg`
                },
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