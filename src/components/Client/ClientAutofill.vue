<script>
export default {
    name: "ClientAutofill",
    render() {
        return null;
    },
    data: () => ({ savedClientInfo: null }),
    created() {
        let card, name, phone;

        if (this.$route.query.client_card) {
            const params = this.$route.query;
            card = params.client_card ?? null;
            name = params.client_name ?? null;
            phone = params.client_phone ?? null;
        } else {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            card = urlParams.get("client_card");
            name = urlParams.get("client_name");
            phone = urlParams.get("client_phone");
        }

        this.savedClientInfo = {
            ...this.client,
            card,
            name,
            phone,
        };

        if (localStorage) {
            this.updateClientFromLocalStorage();
        }

        if (card) {
            this.updateClientFromApi(card);
        }
    },
    methods: {
        updateClientFromLocalStorage() {
            const localStorageClient = localStorage.getItem("lastClientInfo");
            if (localStorageClient) {
                const localStorageClientInfo = JSON.parse(localStorageClient);
                this.savedClientInfo.name = localStorageClientInfo.name;
                this.savedClientInfo.phone = localStorageClientInfo.phone;
                this.savedClientInfo.address = localStorageClientInfo.address;
                this.savedClientInfo.lastStore = JSON.parse(
                    localStorageClientInfo.lastStore
                );
            }
            this.commitUpdates();
        },
        updateClientFromApi(cardNum) {
            this.$api
                .getGuestInfo(cardNum)
                .then((response) => {
                    this.savedClientInfo.name = response.name;
                    this.savedClientInfo.address = response.address;
                    this.savedClientInfo.phone = response.phone;
                    this.savedClientInfo.lastStore = JSON.parse(
                        response.lastStore
                    );
                    this.commitUpdates();
                })
                .catch((error) => console.log(error));
        },
        commitUpdates() {
            this.$store.commit("updateClient", this.savedClientInfo);
            this.$store.commit("updateStore", this.savedClientInfo.lastStore);
        },
    },
    computed: {
        clientIsEmpty() {
            return this.$store.getters.clientIsEmpty;
        },
        client() {
            return this.$store.getters.client;
        },
    },
};
</script>
