'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    layout: 'login-layout',
    user: {
      loggedIn: false,
      data: null
    },
    // colaborador: {
    //   data: null
    // }

  },
  getters: {
    user(state){
      return state.user
    },
    // colaborador(state){
    //   return state.colaborador
    // }
  },
  mutations: {
    SET_LAYOUT (state, newLayout) {
      state.layout = newLayout
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    // SET_COLABORADOR(state, data) {
    //   state.colaborador.data = data;
    // }

  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
          
        });
      } else {
        commit("SET_USER", null);
      }
    }
    // fetchColaborador({ commit }, colaborador) {
    //   commit("SET_LOGGED_IN", user !== null);
    //   if (user) {
    //     commit("SET_COLABORADOR", {
    //       nombre: colaborador.nombre,
    //       apellidos: colaborador.apellios
    //     });
    //   } else {
    //     commit("SET_COLABORADOR", null);
    //   }
    // }
  }
})