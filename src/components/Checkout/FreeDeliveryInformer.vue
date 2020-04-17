<template>
    <section class="card fluid">
        <div class="section">
            <div v-if="total + deliverySum < freeDeliverySum">
                Сумма с доставкой: <strong>{{ total + deliverySum }} р.</strong>
                <br>
                До бесплатной доставки не хватает <strong>{{ freeDeliverySum - (total + deliverySum)}} р.</strong>
            </div>
            <div v-else>
                Доставка бесплатно! )
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "FreeDeliveryInformer",
        props: {
            total: Number
        },
        data: () => ({
            freeDeliverySum: 400,
            deliverySum: 80
        })
    }
</script>

<style scoped>

</style>