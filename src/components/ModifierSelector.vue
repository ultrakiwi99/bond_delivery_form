<template>
    <div class="milk-selector">
        <span class="secondary-text">Молоко</span>
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
    </div>
</template>

<script>
    export default {
        name: "ModifierSelector",
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