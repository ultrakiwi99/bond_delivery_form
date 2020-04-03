<template>
    <section class="container">
        <SingleRowContainer>
            <span class="secondary-text">Размер</span><br>
        </SingleRowContainer>
        <button :class="{primary: sizes[0].selected}"
                @click="selectSize(sizes[0].name)"
                style="margin-right: 1px; padding: 0.2rem 1.2rem"
        >
            {{sizes[0].name}}
        </button>
        <button :class="{primary: sizes[1].selected}"
                @click="selectSize(sizes[1].name)"
                style="margin: 1px auto; padding: 0.2rem 1.2rem"
        >
            {{sizes[1].name}}
        </button>
        <button :class="{primary: sizes[2].selected}"
                @click="selectSize(sizes[2].name)"
                style="margin-left: 1px; padding: 0.2rem 1.2rem"
        >
            {{sizes[2].name}}
        </button>
        <span class="primary-text">{{ selectedSize.price }} р.</span>
    </section>
</template>

<script>
    import SingleRowContainer from "@/components/Visual/SingleRowContainer";

    export default {
        name: "SizeSelector",
        components: {SingleRowContainer},
        data: () => ({
            sizes: [
                {name: 'S', price: 100, selected: true},
                {name: 'M', price: 120, selected: false},
                {name: 'L', price: 140, selected: false}
            ]
        }),
        methods: {
            selectSize(sizeName) {
                this.sizes.forEach(size => size.selected = size.name === sizeName)
            }
        },
        computed: {
            selectedSize() {
                return this.sizes.filter(size => size.selected).pop();
            }
        }
    }
</script>

<style scoped>

</style>