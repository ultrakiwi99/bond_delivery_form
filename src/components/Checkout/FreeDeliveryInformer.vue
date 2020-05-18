<template>
        <div>
            <div v-if="total < freeDeliverySum" class="deivery-is-not-free">
                Сумма с доставкой: <strong class="total-with-delivery">{{ total + deliverySum }} р.</strong>
                <br>
                До бесплатной доставки не хватает
                <strong class="need-for-free-delivery">{{ freeDeliverySum - total}} р.</strong>
            </div>
            <div class="deivery-is-free" v-else>
                Доставка бесплатно! )
            </div>
        </div>
</template>

<style scoped>
    .deivery-is-free {
        background: #e0f1bd;
        margin: 0rem;
        padding: 0.5rem;
    }
    .deivery-is-not-free {
        border-left: 10px solid salmon;
        background: #f6d5d0;
        margin: 0rem;
        padding: 0.5rem;
    }
</style>

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

