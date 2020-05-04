<script>
    export default {
        name: "PaymentStatusForProduct",
        render() {
            return null
        },
        created() {
            console.log(this.$route.query);
            if (this.$route.query['orderId']) {
                // this.$api.setOrderPayed(this.$route.query['orderId'])
            }
        }
    }
</script>