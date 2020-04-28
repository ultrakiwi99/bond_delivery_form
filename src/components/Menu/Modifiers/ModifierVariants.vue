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
            variants: Array,
            max: {
                type: Number,
                default: 3
            }
        },
        data: () => ({
            variantsAreVisible: false
        }),
        methods: {
            select(variant) {
                if (this.value.includes(variant)) {
                    this.$emit('input', [...this.value.filter(name => name !== variant)]);
                } else {
                    if (this.value.length < this.max) {
                        this.$emit('input', [...this.value, variant]);
                    }
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
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        align-items: start;

        button {
            margin: 3px;
            //font-size: 0.8rem;
            padding: 5px 5px;
            /* width: 125px; */
            color: white;
        }

        button.secondary {
            background-color: lightslategrey;
        }

        button.selected {
            background-color: crimson !important;
        }
    }
</style>