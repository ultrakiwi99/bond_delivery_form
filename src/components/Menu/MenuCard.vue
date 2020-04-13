<template>
    <section class="card fluid app-section">
        <div @click="$emit('select', idx)" class="section" style="cursor: pointer">
            <div style="display: flex; justify-content: space-between; align-items: center">
                <span><strong>{{ name }}</strong></span>
                <span v-if="qtyInCart > 0">{{ qtyInCart }} на {{ sumInCart }} р.</span>
            </div>
        </div>
        <slot/>
    </section>
</template>

<script>
    export default {
        name: "MenuCard",
        props: {
            idx: Number,
            name: String,
            qtyInCart: Number,
            sumInCart: Number
        }
    }
</script>


<style lang="scss">
    .app-section {
        margin: 0 0.2rem;
    }

    .product-details {
        button {
            margin-left: 0;
        }
    }
</style>