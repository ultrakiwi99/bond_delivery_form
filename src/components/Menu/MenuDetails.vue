<template>
    <div class="section product-details">
        {{ product.comment }}
        <div class="margin-bottom">
            <SizeSelector
                    :selected="sizeSelected"
                    :sizes="product.sizes"
                    @select="selectSize"
                    class="margin-bottom"/>

            <ModifierSelector
                    :mods="product.milks"
                    :selected="milkSelected"
                    @select="selectMilk"
                    class="margin-bottom"
                    v-if="product.milks"/>

            <MenuCardModifiers
                    :modifiers="product.modifiers"
                    :selected="modsSelected"
                    @select="selectMod"
                    class="margin-bottom"/>

            <div>
                <strong>Стоимость напитка: {{ totalPrice }} р.</strong>
            </div>

            <button @click="toCart" class="btn primary">
                <span v-if="isInCart">Добавить еще!</span>
                <span v-else>Добавить</span>
            </button>
        </div>
    </div>
</template>

<script>
    import MenuCardModifiers from "@/components/MenuCardModifiers";
    import SizeSelector from "@/components/Size/SizeSelector";
    import ModifierSelector from "@/components/ModifierSelector";

    export default {
        name: "MenuDetails",
        components: {ModifierSelector, SizeSelector, MenuCardModifiers},
        props: {
            product: Object
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
            modsSelected: []
        }),
        methods: {
            selectSize(size) {
                this.sizeSelected = size;
            },
            selectMilk(milkName) {
                this.milkSelected = this.product.milks.find(milk => milk.name === milkName);
            },
            selectMod(mod) {
                for (let modIdx in this.modsSelected) {
                    if (this.modsSelected[modIdx].name === mod.name) {
                        this.modsSelected = this.modsSelected.filter(modSelected => modSelected.name !== mod.name);
                        return;
                    }
                }
                this.modsSelected.push(mod);
            },
            toCart() {
                this.$emit('toCart', {
                    name: this.product.name,
                    milk: this.milkSelected,
                    size: this.sizeSelected,
                    mods: this.modsSelected,
                    price: this.totalPrice
                })
            }
        },
        computed: {
            totalPrice() {
                const milkPrice = this.milkSelected && this.milkSelected.price && this.milkSelected.price
                    ? this.milkSelected.price
                    : 0;
                const modsPrice = this.modsSelected
                    ? this.modsSelected.reduce((carry, mod) => carry + mod.price, 0)
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
</style>