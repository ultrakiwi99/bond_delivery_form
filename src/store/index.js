import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  getters: {
    cart: state => state.cart
  },
  mutations: {
    pushToCart(state, product) {
      state.cart = [...state.cart, product];
    },
    removeFromCart(state, {product, productIdx}) {
      state.cart = [...state.cart.filter(
          (cartProd, cartIdx) => !(cartProd.name === product.name && cartIdx === productIdx)
      )];
    }
  },
  actions: {}
})
