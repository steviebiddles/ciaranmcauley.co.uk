$(document).ready(function() {
    moment().format();

    // Initialize Firebase
    var firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBrkM7LCtz7mVt3zyNlmpVHPcVTL19wKBQ",
        authDomain: "dj-ciaran-mcauley-events.firebaseapp.com",
        databaseURL: "https://dj-ciaran-mcauley-events.firebaseio.com",
        storageBucket: "dj-ciaran-mcauley-events.appspot.com",
        messagingSenderId: "484566912624"
    });

    var db = firebaseApp.database();
    var eventsRef = db.ref("future");

    // explicit installation required in module environments
    Vue.use(VueFire);

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

    var vm = new Vue({
        el: "#app",
        firebase: {
            futureEvents: {
                source: eventsRef.limitToFirst(20),
                asArray: true,
                cancelCallback: function() {}
            }
        },
        methods: {
            eventUri: function(id) {
                return "https://www.facebook.com/events/" + id;
            },
            address: function(place) {
                var address = [];

                if (place.hasOwnProperty('location')) {
                    var addressLocation = place.location;

                    // street
                    if (addressLocation.hasOwnProperty('street')) {
                        address.push(addressLocation.street);
                    }

                    // city
                    if (addressLocation.hasOwnProperty('city')) {
                        address.push(addressLocation.city);
                    }

                    // country
                    if (addressLocation.hasOwnProperty('country')) {
                        address.push(addressLocation.country);
                    }

                    return address.join(', ');
                }
            }
        }
    });
});