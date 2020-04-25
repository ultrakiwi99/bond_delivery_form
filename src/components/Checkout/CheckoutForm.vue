<template>
    <form @submit.prevent="">
        <h3>Данные заказа</h3>
        <input placeholder="Ваше имя" required type="text" v-model="client.name"/>
        <input placeholder="Адрес" required type="text" v-model="client.address"/>
        <input placeholder="Телефон" required type="tel" v-model="client.phone"/>
        <textarea placeholder="Комментарий" rows="3" style="width: 100%" v-model="client.comment"></textarea>
    </form>
</template>

<script>
    export default {
        name: "CheckoutForm",
        props: {
            client: Object
        }
    }
</script>