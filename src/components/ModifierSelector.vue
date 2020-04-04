<template>
    <section class="container">
        <SingleRowContainer>
            <span class="secondary-text">Молоко</span>
        </SingleRowContainer>
        <label>
            <select @input="select">
                <option :key="mod.name" v-for="mod in mods">
                    {{ mod.name }}
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
        props: {
            mods: Array,
            selected: Object
        },
        methods: {
            select(event) {
                this.$emit('select', event.target.value);
            }
        }
    }
</script>

<style scoped>

</style>