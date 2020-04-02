<template>
    <v-container>
        <h1 style="text-align: center">{{ title }}</h1>
    </v-container>
</template>

<script>
    export default {
        name: "Hero",
        props: {
            title: String
        }
    }
</script>

<style scoped>

</style>