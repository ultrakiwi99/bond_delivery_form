<template functional>
    <section class="menu-mods">
        <span class="secondary-text">Добавить</span>
        <slot/>
    </section>
</template>

<style lang="scss" scoped>
    .mod-select {
        display: flex;
        align-items: center;
        margin-left: 0;

        .mod-details {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: baseline;

            .mod-price {
                margin-left: 1rem;
            }
        }
    }
</style>