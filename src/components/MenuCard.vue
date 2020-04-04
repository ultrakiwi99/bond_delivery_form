<template>
    <section class="card fluid">
        <div @click="$emit('makeVisible', product.id)"
             class="section"
             style="cursor: pointer">
            <div style="display: flex; justify-content: space-between; align-items: center">
                <span><strong>{{ product.name }}</strong></span>
                <span v-if="isInCart">{{ qtyInCart }} на {{ sumInCart }} р.</span>
            </div>
        </div>
        <transition name="fade">
            <div class="section" v-show="product.visible">
                <SingleRowContainer v-if="hasComment">
                    {{ product.comment }}
                </SingleRowContainer>
                <div class="container" style="margin-top: 1rem">
                    <SizeSelector :selected="sizeSelected" :sizes="product.sizes" @select="selectSize"/>
                    <ModifierSelector :milks="product.milks" v-if="product.milks"/>
                    <MenuCardModifiers :modifiers="product.modifiers"/>
                    <div class="container">
                        <strong>Стоимость напитка: {{ totalPrice }} р.</strong>
                    </div>
                    <button @click="$emit('toCart', product)" class="btn primary">
                        <span v-if="isInCart">Добавить еще!</span>
                        <span v-else>Добавить</span>
                    </button>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
    import MenuCardModifiers from "@/components/MenuCardModifiers";
    import SizeSelector from "@/components/SizeSelector";
    import ModifierSelector from "@/components/ModifierSelector";
    import SingleRowContainer from "@/components/Visual/SingleRowContainer";

    export default {
        name: "MenuCard",
        components: {SingleRowContainer, ModifierSelector, SizeSelector, MenuCardModifiers},
        props: {
            product: Object,
            qtyInCart: Number,
            sumInCart: Number
        },
        beforeMount() {
            this.sizeSelected = this.product.sizes[0];
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
            }
        },
        computed: {
            totalPrice() {
                return this.sizeSelected.price
            },
            isInCart() {
                return this.qtyInCart > 0;
            },
            hasComment() {
                return this.product.comment && this.product.comment.length;
            }
        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
