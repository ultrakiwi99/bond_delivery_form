<template>
    <section class="card">
        <h3 class="head" @click="$emit('makeVisible', product.id)">
            <span>{{ product.name }}</span>
            <span v-if="isInCart">{{ product.inCart }}</span>
        </h3>
        <transition name="fade">
            <div v-show="product.visible">
                <section class="section">
                    <div class="container">
                        <span class="comment" v-if="hasComment">{{ product.comment }}</span>
                        <MenuCardModifiers :modifiers="product.modifiers"/>
                        <h4>Стоимость напитка: <span class="secondary">{{ totalPrice }} р.</span></h4>
                    </div>
                </section>
                <section>
                    <button class="btn" @click="$emit('toCart', product)">
                        <span v-if="isInCart">Добавить еще!</span>
                        <span v-else>Добавить</span>
                    </button>
                </section>
            </div>
        </transition>
    </section>
</template>

<script>
    import MenuCardModifiers from "@/components/MenuCardModifiers";

    export default {
        name: "MenuCard",
        components: {MenuCardModifiers},
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
        transition: opacity .7s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
