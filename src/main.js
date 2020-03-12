import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import {store} from './store'
// import * as firebase from "firebase";
import firebase from 'firebase';
 import VueFire from 'vuefire';
// Vue.use(VueFire);
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
var secondaryAppConfig = {
  apiKey: "AIzaSyB1PtbrxIC7pfT5Vy1R3MPAEyOCjuQa6B8",
  authDomain: "konectase-522d7.firebaseapp.com",
  databaseURL: "https://konectase-522d7.firebaseio.com",
  projectId: "konectase-522d7",
  storageBucket: "konectase-522d7.appspot.com",
  messagingSenderId: "1088807972190",
  appId: "1:1088807972190:web:f8a9f09e09e06a075973cf",
  measurementId: "G-ZGG15E1TFG"

};
firebase.initializeApp(configOptions);

export var secondary = firebase.initializeApp(secondaryAppConfig, "secondary");

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
