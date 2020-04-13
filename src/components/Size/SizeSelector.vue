<template>
    <div class="size-selector">
        <button
                :class="{'selected': isSelected(size), 'primary': !isSelected(size)}"
                :key="idx"
                @click="selectSize(size)"
                v-for="(size, idx) in sizes">{{ size.short }}
        </button>
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

            &.selected {
                color: white;
                background-color: darkviolet;
            }
        }
    }
</style>
