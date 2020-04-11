<template>
    <div>
        <slot v-if="visibleIdx === selectedIdx"/>
    </div>
</template>

<script>

    export default {
        name: "Collapsable",
        props: {
            visibleIdx: Number,
            selectedIdx: Number
        }
    }
</script>

<style scoped>

</style>