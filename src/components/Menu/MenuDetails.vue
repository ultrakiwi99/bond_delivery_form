<template>
    <div class="section product-details">
        <div v-if="product.comment" class="product-description">
            {{ product.comment }}
        </div>
        <div>
            <SizeSelector
                    :selected="sizeSelected"
                    :sizes="product.sizes"
                    @select="selectSize"
                    style="margin-top: 0.5rem"
                    class="margin-bottom"/>

            <ModifierSelector
                    :mods="product.milks"
                    :selected="milkSelected"
                    @select="selectMilk"
                    class="margin-bottom"
                    v-if="product.milks"/>

            <ModifiersList>
                <Modifier :key="idx" :mod="mod" v-for="(mod, idx) in product.modifiers"/>
            </ModifiersList>

            <textarea
                    class="fluid"
                    :rows="commentRows"
                    @click="commentClick"
                    @mouseleave="commentLeave"
                    placeholder="Комментарий к блюду"
                    v-model="optionalComment"></textarea>

            <div class="margin-bottom">
                <strong>Стоимость блюда: {{ totalPrice }} р.</strong>
            </div>

            <div class="buttons">
                <button @click="toCart" class="btn primary">
                    <span>Добавить</span>
                </button>
                <slot name="qty"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import SizeSelector from "@/components/Size/SizeSelector";
    import ModifierSelector from "@/components/ModifierSelector";
    import ModifiersList from "@/components/Menu/Modifiers/ModifiersList";
    import Modifier from "@/components/Menu/Modifiers/Modifier";

    export default {
        name: "MenuDetails",
        components: {Modifier, ModifierSelector, SizeSelector, ModifiersList},
        props: {
            product: Object,
            qtyInCart: {
                type: Number,
                default: 0
            }
        },
        beforeMount() {
            this.sizeSelected = this.product.sizes.find(size => size.selected);
            if (this.product.milks) {
                this.milkSelected = this.product.milks[0];
            }
        },
        data: () => ({
            isVisible: false,
            sizeSelected: null,
            milkSelected: null,
            optionalComment: null,
            commentRows: 1
        }),
        methods: {
            commentClick() {
                this.commentRows = 3;
            },
            commentLeave() {
                this.commentRows = 1;
            },
            selectSize(size) {
                this.sizeSelected = size;
            },
            selectMilk(milkName) {
                this.milkSelected = this.product.milks.find(milk => milk.name === milkName);
            },
            toCart() {
                const mods = this.product.modifiers
                    ? JSON.parse(JSON.stringify(this.product.modifiers.filter(mod => mod.selected)))
                    : [];

                if (mods.length > 0) {
                    const modsWithNoSelectedVariants = mods.filter(
                        mod => mod.variants && mod.variants.selected.length < 1
                    );
                    if (modsWithNoSelectedVariants.length > 0) {
                        return;
                    }
                }

                this.$emit('toCart', {
                    name: this.product.name,
                    milk: this.milkSelected,
                    size: this.sizeSelected,
                    mods: mods ? mods : [],
                    price: this.totalPrice,
                    comment: this.optionalComment
                })
            }
        },
        computed: {
            totalPrice() {
                const milkPrice = this.milkSelected && this.milkSelected.price && this.milkSelected.price
                    ? this.milkSelected.price
                    : 0;
                const modsPrice = this.product.modifiers
                    ? this.product.modifiers
                        .filter(mod => mod.selected)
                        .reduce((carry, mod) => carry + mod.price, 0)
                    : 0;

                return this.sizeSelected.price + milkPrice + modsPrice;
            },
            isInCart() {
                return this.qtyInCart > 0;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .product-details {
        margin: 0 0.6rem;

        button {
            margin-left: 0;
        }
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    textarea {
        width: 99%;
    }
</style>