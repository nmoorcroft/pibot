var pibot = angular.module('pibot', ['ionic']);

pibot.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

});


pibot.constant('baseUrl', 'http://192.168.1.4:5000/api');

pibot.factory('program', Program);

pibot.controller('MainCtrl', MainCtrl);

function MainCtrl(program) {
    var self = this;
    program.list().then(function(list) {
        self.list = list;
    });

    self.forward = function() {
       program.forward(10).then(function(list) {
           self.list = list;
       });
    };

    self.right = function() {
        program.right(10).then(function(list) {
            self.list = list;
        });
    };

    self.left = function() {
        program.left(10).then(function(list) {
            self.list = list;
        });
    };

    self.go = function() {
        program.go().then(function(list) {
            self.list = list;
        });
    };
}

function Program(baseUrl, $http, $q) {
    return {
        list: function() {
            var deferred = $q.defer();
            $http.get(baseUrl + '/list').success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;

        },

        forward: function(dist) {
            var deferred = $q.defer();
            $http.get(baseUrl + '/forward?dist=' + dist).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;


        },

        right: function(dist) {
            var deferred = $q.defer();
            $http.get(baseUrl + '/right?dist=' + dist).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;


        },

        left: function(dist) {
            var deferred = $q.defer();
            $http.get(baseUrl + '/left?dist=' + dist).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;


        },

        go: function() {
            var deferred = $q.defer();
            $http.get(baseUrl + '/go').success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;


        }



    };

}

