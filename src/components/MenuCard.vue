<template>
    <section class="card">
        <section @click="isVisible = !isVisible">
            <h3>
                <div>{{ product.name }}</div>
                <div v-if="isInCart">{{ product.inCart }}</div>
            </h3>
        </section>
        <section v-show="isVisible">
            <section v-if="product.comment && product.comment.length">
                <section type="success">{{ product.comment }}</section>
            </section>
            <MenuCardModifiers :modifiers="product.modifiers"/>
            <strong>Стоимость напитка:</strong> {{ totalPrice }} р.
            <section>
                <button @click="$emit('toCart', product)">
                    <span v-if="isInCart">Добавить еще!</span>
                    <span v-else>Добавить</span>
                </button>
            </section>
        </section>
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
            hasComment() {
                return this.product.comment && this.product.comment.length;
            },
            isInCart() {
                return this.product.inCart > 0;
            }
        }
    }
</script>

<style scoped>
    h3 {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
</style>