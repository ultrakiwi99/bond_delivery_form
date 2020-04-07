<template>
    <div style="height: 80vh; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <span>{{ message }}</span>
        <button @click="$emit('reset')" class="primary">В меню</button>
    </div>
</template>

<script>
    export default {
        name: "SendEmailResult",
        props: {
            message: String
        }
    }
</script>

<style scoped>

</style>