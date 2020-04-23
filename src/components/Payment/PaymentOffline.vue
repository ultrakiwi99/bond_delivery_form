<template>
    <button @click="$emit('makeOrder')" role="button">Заказать</button>
</template>

<script>
    export default {
        name: "PaymentOffline"
    }
</script>