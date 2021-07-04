<script>
    export default {
        name: "PaymentStatusForProduct",
        render() {
            return null
        },
        created() {
            if (this.$route.query['orderId']) {
                this.$api.setOrderPayed(this.$route.query['orderId'])
            }
        }
    }
</script>