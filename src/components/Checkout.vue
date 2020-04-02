<template>
    <form>
        <v-text-field v-model="client.name" placeholder="Ваше имя/Марка машины"/>
        <v-text-field v-model="client.address" placeholder="Адрес"/>
        <v-text-field v-model="client.phone" placeholder="Телефон"/>
        <v-textarea v-model="client.comment" placeholder="Комментарий"/>
    </form>
</template>

<script>
    export default {
        name: "Checkout",
        props: {
            client: Object
        }
    }
</script>

<style scoped>

</style>