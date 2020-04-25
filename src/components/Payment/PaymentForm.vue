<template>
    <form>
        <fieldset>
            <legend>Выберите тип оплаты</legend>
            <slot/>
        </fieldset>
    </form>
</template>

<script>
    export default {
        name: "PaymentForm"
    }
</script>

<style scoped>

</style>