<template>
    <div class="size-selector">
        <div class="secondary-text" style="margin-bottom: 0.5rem">Размер</div>
        <button
                :class="{'selected': isSelected(size), 'primary': !isSelected(size)}"
                :key="idx"
                @click="selectSize(size)"
                v-for="(size, idx) in sizes">{{ size.short }}
        </button>
        <span class="price" v-if="selected">{{ selected.price }} р.</span>
    </div>
</template>

<script>
    export default {
        name: "SizeSelector",
        props: {
            sizes: Array,
            selected: {
                type: Object,
                default: null
            }
        },
        methods: {
            isSelected(size) {
                return size.short === this.selected.short;
            },
            selectSize(size) {
                this.$emit('select', size);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .size-selector {
        button {
            margin: 1px;
            background-color: lightslategrey;

            &.selected {
                color: white;
                background-color: crimson !important;;
            }
        }

        .price {
            margin-left: 1rem;
            color: #1976d2;
        }
    }
</style>
