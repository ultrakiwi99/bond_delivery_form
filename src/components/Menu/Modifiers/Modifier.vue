<template>
    <div class="modifier">
        <label>
            <input @input="select(mod)" type="checkbox"/>
            <span class="details">
                <span>{{ mod.name }}</span>
                <span class="price primary-text">{{ mod.price }}р.</span>
            </span>
        </label>
        <ModifierVariants
                :variants="mod.variants.list"
                v-if="checked && mod.variants"
                v-model="mod.variants.selected"/>
        <div class="secondary-text">
            <small v-if="mod.comment && mod.comment.length">{{ mod.comment }}</small>
        </div>
    </div>
</template>

<script>
    import ModifierVariants from "@/components/Menu/Modifiers/ModifierVariants";

    export default {
        name: "Modifier",
        components: {ModifierVariants},
        props: {
            mod: Object
        },
        data: () => ({
            checked: false
        }),
        methods: {
            select(mod) {
                this.checked = !this.checked;
                this.$emit('select', mod);
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