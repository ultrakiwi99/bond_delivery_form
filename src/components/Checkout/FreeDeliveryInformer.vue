<template>
    <section class="card fluid">
        <div class="section">
            <div v-if="total < freeDeliverySum">
                Сумма с доставкой: <strong class="total-with-delivery">{{ total + deliverySum }} р.</strong>
                <br>
                До бесплатной доставки не хватает
                <strong class="need-for-free-delivery">{{ freeDeliverySum - total}} р.</strong>
            </div>
            <div class="free-delivery-notice" v-else>
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