<template>
    <h1 ref="title">{{ title }}</h1>
</template>

<script>
    export default {
        name: "Hero",
        mounted() {
            this.$refs.title.scrollIntoView(false);
        },
        props: {
            title: String
        }
    }
</script>

<style scoped>
    h1 {
        text-align: center;
    }
</style>