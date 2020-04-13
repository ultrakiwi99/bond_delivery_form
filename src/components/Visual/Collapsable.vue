<template>
    <div>
        <CollapseTransition>
            <slot v-if="visibleIdx === selectedIdx"/>
        </CollapseTransition>
    </div>
</template>

<script>
    import {CollapseTransition} from "vue2-transitions";

    export default {
        name: "Collapsable",
        components: {CollapseTransition},
        props: {
            visibleIdx: Number,
            selectedIdx: Number
        }
    }
</script>

<style scoped>

</style>