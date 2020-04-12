<template>
    <section class="card fluid app-section">
        <div @click="$emit('makeVisible', product.id)" class="section" style="cursor: pointer">
            <div style="display: flex; justify-content: space-between; align-items: center">
                <span><strong>{{ product.name }}</strong></span>
                <span v-if="isInCart">{{ qtyInCart }} на {{ sumInCart }} р.</span>
            </div>
        </div>
        <CollapseTransition>
            <div class="section product-details" v-show="product.visible">
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
        </CollapseTransition>
    </section>
</template>

<script>
    import MenuCardModifiers from "@/components/MenuCardModifiers";
    import SizeSelector from "@/components/Size/SizeSelector";
    import ModifierSelector from "@/components/ModifierSelector";
    import {CollapseTransition} from "vue2-transitions";

    export default {
        name: "MenuCard",
        components: {ModifierSelector, SizeSelector, MenuCardModifiers, CollapseTransition},
        props: {
            product: Object,
            qtyInCart: Number,
            sumInCart: Number
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
<style lang="scss">
    .app-section {
        margin: 0 0.2rem;
    }

    .product-details {
        button {
            margin-left: 0;
        }
    }
</style>