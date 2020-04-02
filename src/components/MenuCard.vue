<template>
    <v-container>
        <v-card>
            <v-card-title @click="isVisible = !isVisible">
                <h3>
                    <div>{{ product.name }}</div>
                    <div v-if="product.inCart > 0">{{ product.inCart }}</div>
                </h3>
            </v-card-title>
            <v-card-text v-show="isVisible">
                <v-container v-if="product.comment && product.comment.length">
                    <v-chip type="success">{{ product.comment }}</v-chip>
                </v-container>
                <MenuCardModifiers :modifiers="product.modifiers"/>
                <strong>Стоимость напитка:</strong> {{ totalPrice }} р.
                <v-container>
                    <v-btn @click="$emit('toCart', product)">Добавить</v-btn>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
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