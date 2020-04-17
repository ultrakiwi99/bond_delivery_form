<template>
    <div class="modifier">
        <label>
            <input type="checkbox" v-model="mod.selected"/>
            <span class="details">
                <span>{{ mod.name }}</span>
                <span class="price primary-text">{{ mod.price }}р.</span>
            </span>
        </label>

        <CollapseTransition>
            <div v-if="showVariantsError">Выберите от 1 до 3 вариантов</div>
        </CollapseTransition>

        <ModifierVariants
                :variants="mod.variants.list"
                v-if="mod.selected && mod.variants"
                v-model="mod.variants.selected"/>
        <div class="secondary-text">
            <small v-if="mod.comment && mod.comment.length">{{ mod.comment }}</small>
        </div>
    </div>
</template>

<script>
    import ModifierVariants from "@/components/Menu/Modifiers/ModifierVariants";
    import {CollapseTransition} from "vue2-transitions";

    export default {
        name: "Modifier",
        components: {ModifierVariants, CollapseTransition},
        props: {
            mod: Object
        },
        computed: {
            showVariantsError() {
                return this.mod.selected
                    && this.mod.variants
                    && this.mod.variants.selected.length === 0;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modifier {
        label {
            display: flex;
            align-items: center;

            .details {
                margin: 0 .4rem;

                .price {
                    margin-left: .4rem;
                }
            }
        }
    }
</style>