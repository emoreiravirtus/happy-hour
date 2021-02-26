// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from "firebase";
require("firebase/firestore");
import { store } from './store'
Vue.use(require('vue-moment'));
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import FunctionalCalendar from 'vue-functional-calendar';
Vue.use(FunctionalCalendar, {
    dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});

// Main JS (in UMD format)
import VueTimepicker from 'vue2-timepicker'
// CSS
import 'vue2-timepicker/dist/VueTimepicker.css'
Vue.use(VueTimepicker)

Vue.config.productionTip = false;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbJ0rMHCJseAQwvrgnYfWjKgcHGZpNgoE",
  authDomain: "teste-oowlish-c9315.firebaseapp.com",
  databaseURL: "https://teste-oowlish-c9315.firebaseio.com",
  projectId: "teste-oowlish-c9315",
  storageBucket: "teste-oowlish-c9315.appspot.com",
  messagingSenderId: "490222816157",
  appId: "1:490222816157:web:5835725e13a291dcab7d74"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

let app = '';

firebaseApp.auth().onAuthStateChanged(() =>{
  if(!app){
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
