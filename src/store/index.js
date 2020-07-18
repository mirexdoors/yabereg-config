import Vue from 'vue';
import Vuex from 'vuex';
import Settings from './modules/settings';
import Result from './modules/result';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    Settings,
    Result
  },
});
