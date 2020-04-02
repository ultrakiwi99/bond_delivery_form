<template>
    <section style="width: 100%">
        <h5>Добавить</h5>
        <div v-for="(mod) in modifiers" :key="mod.name" class="mod">
            <label><input type="checkbox"/>{{ mod.name }}</label>
            <div class="mod-comment">
                <small v-if="mod.comment && mod.comment.length">{{ mod.comment }}</small>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MenuCardModifiers",
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

    .mod-comment {
        max-width: 80%;
        margin-left: 2.2rem;
        color: gray;
    }
</style>