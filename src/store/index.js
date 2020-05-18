import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    client: {
      card: null,
      name: null,
      phone: null,
      address: null,
      comment: null,
      lastStore: null
    },
    lastStore: null,
    giftSelected: null
  },
  getters: {
    cart: state => state.cart,
    cartHasProducts: state => state.cart.length > 0,
    client: state => state.client,
    clientIsEmpty: state => Object.values(state.client).every(entry => entry === null),
    clientIsValidToSend: state => ['name', 'phone', 'address'].every(propName => !!state.client[propName]),
    lastStore: state => state.lastStore,
    giftSelected: state => state.giftSelected
  },
  mutations: {
    pushToCart(state, product) {
      state.cart = [...state.cart, product];
    },
    removeFromCart(state, {product, productIdx}) {
      state.cart = [...state.cart.filter(
          (cartProd, cartIdx) => !(cartProd.name === product.name && cartIdx === productIdx)
      )];
    },
    resetCart(state) {
      state.cart = [];
    },
    updateClient(state, client) {
      state.client = state.client ? {...state.client, ...client} : {...client}
    },
    updateStore(state, store) {
      state.lastStore = store;
    },
    updateGiftSelected(state,yesOrNo) {
      state.giftSelected = yesOrNo;
    }
  },
  actions: {
    saveClientInfo(context) {
      const client = context.getters.client;
      const lastStore = context.getters.lastStore;

      client.lastStore = JSON.stringify(lastStore);

      if (localStorage) {
        localStorage.setItem('lastClientInfo', JSON.stringify(client));
      }
    }
  }
})
