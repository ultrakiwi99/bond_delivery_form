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
    lastStore: null
  },
  getters: {
    cart: state => state.cart,
    cartHasProducts: state => state.cart.length > 0,
    client: state => state.client,
    lastStore: state => state.lastStore
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
      state.client = {...state.client, ...client};
    },
    updateStore(state, store) {
      state.lastStore = store;
    }
  },
  actions: {}
})
