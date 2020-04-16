<template>
    <div>
        <div class="categories">
            <div class="wrapper">
                <span :data-idx="idx"
                      :key="idx"
                      @click="setCategory"
                      :class="(idx == selectedIdx) ? 'category-name-selected' : 'category-name'"
                      v-for="(name,idx) in categoryNames">
                    {{ name  }}
                </span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Categories",
        props: {
            categoryNames: Array
        },
        data: () => ({
            selectedIdx: 0
        }),
        methods: {
            setCategory(event) {
                const categoryElement = event.target;
                categoryElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center"
                });
                this.selectedIdx = categoryElement.dataset.idx;
                this.$emit('select', categoryElement.dataset.idx);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .categories {
        margin-bottom: 1rem;

        .wrapper {
            overflow-y: scroll;
            overflow-scrolling: touch;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;

            &::-webkit-scrollbar {
                display: none;
            }

            .category-name {
                padding: 0.2rem 0.4rem;
                margin: 0.2rem;
                border-radius: 1rem;
                background: lightgrey;
                cursor: pointer;
            }

            .category-name-selected {
                padding: 0.2rem 0.4rem;
                margin: 0.2rem;
                border-radius: 1rem;
                background: darkviolet;
                color: white;
                cursor: pointer;
            }

        }
    }
</style>