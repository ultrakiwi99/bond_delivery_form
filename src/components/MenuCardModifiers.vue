<template>
    <section class="menu-mods">
        <span class="secondary-text">Добавить</span>
        <div :key="mod.name" v-for="(mod,idx) in modifiers">
            <label class="mod-select">
                <input :checked="isSelected(mod)"
                       :id="'id-' + mod.price + idx"
                       @input="select(mod)"
                       style="margin-right: 1rem"
                       type="checkbox"/>
                <span class="mod-details">
                    <span>{{ mod.name }}</span>
                    <span class="mod-price primary-text">{{ mod.price }}р.</span>
                </span>
            </label>
            <div class="secondary-text" style="padding-left: 1rem">
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
        display: flex;
        align-items: center;
        margin-left: 0;

        .mod-details {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: baseline;

            .mod-price {
                margin-left: 1rem;
            }
        }
    }
</style>