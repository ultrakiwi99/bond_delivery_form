<template>
    <section class="menu-mods">
        <span class="secondary-text">Добавить</span>
        <div :key="mod.name" class="mod-select" v-for="(mod) in modifiers">
            <input :checked="isSelected(mod)" @input="select(mod)" style="margin-right: 1rem" type="checkbox"/>
            <label>
                <span>{{ mod.name }}</span>
                <span>{{ mod.price }} р.</span>
            </label>
            <div class="secondary-text">
                <small v-if="mod.comment && mod.comment.length">{{ mod.comment }}</small>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MenuCardModifiers",
        props: {
            modifiers: Array,
            selected: Array
        },
        methods: {
            isSelected(modToCheck) {
                return !this.modifiers.find(mod => mod.name === modToCheck.name);
            },
            select(mod) {
                this.$emit('select', mod);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mod-select {
        .mod-select {
            display: inline-flex;
            justify-content: start;
            align-items: baseline;
        }
    }
</style>