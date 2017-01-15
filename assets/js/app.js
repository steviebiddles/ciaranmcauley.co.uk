'use strict';

var Vue = require('vue/dist/vue.js'),
    VueFire = require('vuefire'),
    Firebase = require('firebase'),
    moment = require('moment');

// explicit installation required in module environments
Vue.use(VueFire);
moment.locale();

Vue.filter("formatMonth", function(value){
    if (value) {
        return moment(String(value)).format('MMM')
    }
});
Vue.filter("formatDayName", function(value){
    if (value) {
        return moment(String(value)).format('ddd')
    }
});
Vue.filter("formatDay", function(value){
    if (value) {
        return moment(String(value)).format('DD')
    }
});


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
var eventsRef = db.ref("future");

var app = new Vue({
    el: "#app",
    firebase: {
        futureEvents: {
            source: eventsRef.orderByChild("start_time").limitToFirst(20),
            asArray: true,
            cancelCallback: function () {}
        }
    }
});