<template>
    <div class="variants">
        <div class="selected">
            <span :key="idx" @click="remove(name)" v-for="(name, idx) in value">{{name}}</span>
            <button :class="{'close': variantsAreVisible}"
                    @click="variantsAreVisible = !variantsAreVisible"
                    class="btn-add-variant">
                <strong v-if="!variantsAreVisible">+</strong>
                <strong v-else>&times;</strong>
            </button>
        </div>
        <div class="list" v-if="variantsAreVisible">
            <span :key="idx" @click="add(name)" v-for="(name, idx) in variants">{{name}}</span>
        </div>
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
            add(variantName) {
                const existing = [...this.value];
                if (!existing.includes(variantName)) {
                    this.$emit('input', [...existing, variantName]);
                }
            },
            remove(variantName) {
                const existing = [...this.value];
                if (existing.includes(variantName)) {
                    this.$emit('input', [...existing.filter(name => name !== variantName)]);
                }
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