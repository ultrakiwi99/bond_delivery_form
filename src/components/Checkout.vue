<template>
    <form @submit.prevent="$emit('makeOrder')">
        <h3>Данные заказа</h3>
        <input placeholder="Ваше имя/Марка машины" required type="text" v-model="client.name"/>
        <input placeholder="Адрес" required type="text" v-model="client.address"/>
        <input placeholder="Телефон" required type="tel" v-model="client.phone"/>
        <textarea placeholder="Комментарий" required v-model="client.comment"></textarea>
        <button role="button" type="submit">Заказать</button>
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