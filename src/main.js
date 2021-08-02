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
  apiKey: "AIzaSyDbi63UYLh3CqeA6ZV5Ogd9FPZPPt7PvnM",
  authDomain: "konecta-accesos.firebaseapp.com",
  databaseURL: "https://konecta-accesos.firebaseio.com",
  projectId: "konecta-accesos",
  storageBucket: "konecta-accesos.appspot.com",
  messagingSenderId: "903312260124",
  appId: "1:903312260124:web:9a34970961425927c8f3d9"
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
