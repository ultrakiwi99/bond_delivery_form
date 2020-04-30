<script>
    export default {
        name: "RedirectToMenu",
        render() {
            return null
        },
        created() {
            if (!this.cartHasProducts) {
                this.$router.push('/');
            }
        },
        computed: {
            cartHasProducts() {
                return this.$store.getters.cartHasProducts;
            }
        },
        watch: {
            cartHasProducts() {
                if (!this.cartHasProducts) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>
