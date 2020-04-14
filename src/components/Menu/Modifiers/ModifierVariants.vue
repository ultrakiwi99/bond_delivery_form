<template>
    <div class="variants">
        <button
                :class="{'selected': isSelected(variant), 'secondary': !isSelected(variant)}"
                :key="idx"
                @click="select(variant)"
                v-for="(variant, idx) in variants"
        >{{ variant }}
        </button>
    </div>
</template>

<script>
    export default {
        name: "ModifierVariants",
        props: {
            value: Array,
            variants: Array
        },
        data: () => ({
            variantsAreVisible: false
        }),
        methods: {
            select(variant) {
                if (this.value.includes(variant)) {
                    this.$emit('input', [...this.value.filter(name => name !== variant)]);
                } else {
                    this.$emit('input', [...this.value, variant]);
                }
            },
            isSelected(variant) {
                return !!this.value.find(name => name === variant);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .variants {
        padding-left: .6rem;

        .btn-add-variant {
            padding: 0 0.4rem;
            border-radius: 1rem;
            margin: 0;
            margin-left: 0.1rem;
            background-color: green;
            color: white;
        }

        .close {
            background-color: darkred;
        }

        .selected,
        .list {
            display: flex;
            justify-content: start;
            align-items: center;
            width: 100%;
            flex-wrap: wrap;
        }

        span {
            padding: 0.2rem 0.3rem;
            margin: 0.2rem;
            color: white;
            border-radius: .5rem;
            background-color: #4a148c;
        }

        .selected span {
            background-color: #1976d2;
        }
    }
</style>