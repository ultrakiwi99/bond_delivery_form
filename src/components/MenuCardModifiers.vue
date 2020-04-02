<template>
    <v-container>
        <h4 style="color: gray">Добавить</h4>
        <div v-for="(mod, idx) in modifiers" :key="mod.name">
            <v-checkbox
                    :label="`${mod.name} ${modPrice(mod)}`"
                    @click="$emit('toggleMod', idx)"
                    v-model="modifiers[idx].selected"/>
            <div>
                <small v-if="mod.comment && mod.comment.length">{{ mod.comment }}</small>
            </div>
        </div>
    </v-container>
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

</style>