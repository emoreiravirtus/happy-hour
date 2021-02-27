// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Utils
import FunctionalCalendar from 'vue-functional-calendar';
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
Vue.use(Loading);
Vue.use(require('vue-moment'));
Vue.use(VueTimepicker)
Vue.use(FunctionalCalendar, {
    dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});

Vue.config.productionTip = false;

//Firebase
import firebase from "firebase";
require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyDbJ0rMHCJseAQwvrgnYfWjKgcHGZpNgoE",
  authDomain: "teste-oowlish-c9315.firebaseapp.com",
  databaseURL: "https://teste-oowlish-c9315.firebaseio.com",
  projectId: "teste-oowlish-c9315",
  storageBucket: "teste-oowlish-c9315.appspot.com",
  messagingSenderId: "490222816157",
  appId: "1:490222816157:web:5835725e13a291dcab7d74"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

let app = '';

//Initialize our app
firebaseApp.auth().onAuthStateChanged(() =>{
  if(!app){
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
