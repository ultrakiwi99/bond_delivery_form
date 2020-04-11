<template>
    <div>
        <div class="categories">
            <div class="wrapper">
                <span :data-idx="idx"
                      :key="name"
                      :ref="`category-${idx}`"
                      @click="setCategory"
                      class="category-name"
                      v-for="(name,idx) in categoryNames">
                    {{ name }}
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
        methods: {
            setCategory(event) {
                event.target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .categories {
        margin-bottom: 1rem;

        .wrapper {
            overflow: hidden;
            white-space: nowrap;

            .category-name {
                padding: 0.2rem 0.4rem;
                margin: 0.2rem;
                border-radius: 1rem;
                background: greenyellow;
            }
        }
    }
</style>