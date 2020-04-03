<template>
    <section class="container">
        <SingleRowContainer>
            <span class="secondary-text">Добавить</span>
        </SingleRowContainer>
        <div :key="mod.name" v-for="(mod) in modifiers">
            <label><input style="margin-right: 1rem" type="checkbox"/>{{ mod.name }}</label>
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
            modifiers: Array
        },
        methods: {
            modPrice(mod) {
                return mod.selected ? '+' + mod.price + ' р.' : '';
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