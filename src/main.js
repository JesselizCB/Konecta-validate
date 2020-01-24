import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from './store'
// import * as firebase from "firebase";
import firebase from 'firebase';
require('firebase/firestore');

const configOptions = {
  apiKey: "AIzaSyCWG4l-2HUHomwOMs0ofdquhxoY7r0mpgA",
    authDomain: "validate-k.firebaseapp.com",
    databaseURL: "https://validate-k.firebaseio.com",
    projectId: "validate-k",
    storageBucket: "validate-k.appspot.com",
    messagingSenderId: "472192303750",
    appId: "1:472192303750:web:eddc4e7c5823d975434707"
}; 
firebase.initializeApp(configOptions);

Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  vuetify,
  store,
  firebase,
  render: h => h(App)
}).$mount('#app')
