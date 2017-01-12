'use strict';

var Vue = require('vue/dist/vue.js'),
    VueFire = require('vuefire'),
    Firebase = require('firebase');

// explicit installation required in module environments
Vue.use(VueFire);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrkM7LCtz7mVt3zyNlmpVHPcVTL19wKBQ",
    authDomain: "dj-ciaran-mcauley-events.firebaseapp.com",
    databaseURL: "https://dj-ciaran-mcauley-events.firebaseio.com",
    storageBucket: "dj-ciaran-mcauley-events.appspot.com",
    messagingSenderId: "484566912624"
};

var firebaseApp = Firebase.initializeApp(config);

var db = firebaseApp.database();
var app = new Vue({
    el: "#app",
    firebase: {
        futureEvents: {
            source: db.ref("future").orderByChild("start_time").limitToFirst(20),
            asArray: true,
            cancelCallback: function () {}
        }
    }
});