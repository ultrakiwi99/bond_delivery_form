<template>
    <section class="card fluid">
        <div @click="$emit('makeVisible', product.id)"
             class="section"
             style="cursor: pointer">
            <div style="display: flex; justify-content: space-between; align-items: center">
                <span><strong>{{ product.name }}</strong></span>
                <span v-if="isInCart">{{ product.inCart }}</span>
            </div>
        </div>
        <transition name="fade">
            <div class="section" v-show="product.visible">
                <div class="container" style="margin-top: 1rem">
                    <SizeSelector/>
                    <ModifierSelector/>
                    <MenuCardModifiers :modifiers="product.modifiers"/>
                    <div class="container">
                        <strong>Стоимость напитка: {{ totalPrice }} р.</strong>
                    </div>
                    <button class="btn" @click="$emit('toCart', product)">
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

    export default {
        name: "MenuCard",
        components: {ModifierSelector, SizeSelector, MenuCardModifiers},
        props: {
            product: Object
        },
        data: () => ({
            isVisible: false
        }),
        computed: {
            totalPrice() {
                return this.product.price
                    + this.product.modifiers
                        .reduce((carry, mod) => {
                            if (mod.selected) {
                                carry = carry + mod.price
                            }
                            return carry;
                        }, 0);
            },
            isInCart() {
                return this.product.inCart > 0;
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
