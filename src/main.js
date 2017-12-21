/* eslint-disable no-param-reassign */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'buefy/lib/buefy.css';
import 'font-awesome/css/font-awesome.css';
import 'material-icons/css/material-icons.css';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import Buefy from 'buefy';
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import App from './App';
import router from './router';

if ('serviceWorker' in navigator) {
  runtime.register();
}

Vue.config.productionTip = false;
Vue.use(Buefy, {
  queue: false,
});

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    record: [],
  },
  mutations: {
    addType(state, name) {
      state.record.push({
        name,
        data: [],
      });
      this.dispatch('save');
    },
    deleteType(state, index) {
      Vue.set(state.record[index], 'deleted', true);
      this.dispatch('save');
    },
    recoveryType(state, index) {
      Vue.delete(state.record[index], 'deleted', false);
      this.dispatch('save');
    },
    remove(state, categoryIndex, index) {
      if (state.record[categoryIndex].data.length) {
        state.record[categoryIndex].data.splice(index, 1);
      }
      this.dispatch('save');
    },
    addTime(state, index) {
      const time = moment().format('YYYY-MM-DD HH:mm:ss');
      const record = state.record[index];
      record.data.unshift(time.toLocaleString());
      Vue.set(state.record, index, record);
      this.dispatch('save');
    },
  },
  actions: {
    save(context) {
      const record = context.getters.validRecords;
      window.localStorage.setItem('time', JSON.stringify(record));
    },
  },
  getters: {
    time: state => id => state.record[id].data,
    name: state => id => state.record[id].name,
    validRecords(state) {
      return _.filter(state.record, data => !data.deleted);
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    const time = window.localStorage.getItem('time');
    if (time) {
      this.$store.state.record = JSON.parse(time);
    }
  },
});
