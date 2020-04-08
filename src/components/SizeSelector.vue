<template>
    <section>
        <SingleRowContainer>
            <span class="secondary-text">Размер</span><br>
        </SingleRowContainer>
        <div class="buttons">
            <button :class="{primary: size.short === selected.short}"
                    :key="size.short"
                    @click="selectSize(size)"
                    v-for="size in sizes"
            >
                {{size.short}}
            </button>
            <span class="primary-text" style="margin-left: 1rem">{{ selected.price }} р.</span>
        </div>
    </section>
</template>

<script>
    import SingleRowContainer from "@/components/Visual/SingleRowContainer";

    export default {
        name: "SizeSelector",
        components: {SingleRowContainer},
        props: {
            sizes: Array,
            selected: Object
        },
        methods: {
            selectSize(size) {
                this.$emit('select', size);
            }
        },
    }
</script>

<style scoped>
    .buttons button {
        margin: 1px;
        padding: 10px 20px;
        border: 0;
    }
</style>