<template>
    <section class="container">
        <SingleRowContainer>
            <span class="secondary-text">Молоко</span>
        </SingleRowContainer>
        <label>
            <select v-model="selected">
                <option :value="null" selected>Без молока</option>
                <option :key="milk.name" :value="milk" v-for="milk in milks">
                    {{ milk.name }}
                </option>
            </select>
            <span class="primary-text" style="margin-left: 1rem" v-if="selected && selected.price > 0">
                {{ selected.price }} р.
            </span>
        </label>
    </section>
</template>

<script>
    import SingleRowContainer from "@/components/Visual/SingleRowContainer";

    export default {
        name: "ModifierSelector",
        components: {SingleRowContainer},
        data: () => ({
            milks: [
                {name: 'Банановое', price: 20},
                {name: 'Кокосовое', price: 30},
                {name: 'Соевое', price: 40},
            ],
            selected: null
        })
    }
</script>

<style scoped>

</style>