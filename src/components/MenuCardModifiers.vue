<template>
    <section class="container">
        <SingleRowContainer>
            <span class="secondary-text">Добавить</span>
        </SingleRowContainer>
        <div :key="mod.name" v-for="(mod) in modifiers">
            <label><input :checked="isSelected(mod)" @input="select(mod)" style="margin-right: 1rem" type="checkbox"/>
                {{ mod.name }} <span class="primary-text" style="margin-left: 1rem">{{ mod.price}} р.</span>
            </label>
            <div class="secondary-text">
                <small v-if="mod.comment && mod.comment.length">{{ mod.comment }}</small>
            </div>
        </div>
    </section>
</template>

<script>
    import SingleRowContainer from "@/components/Visual/SingleRowContainer";

    export default {
        name: "MenuCardModifiers",
        components: {SingleRowContainer},
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

<style scoped>
    label {
        display: flex;
        justify-content: start;
        align-items: center;
    }
</style>