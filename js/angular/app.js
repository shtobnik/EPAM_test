angular.module('mainModule', []);
var app = angular.module('mainModule');


app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    $http({
        url: '../../../src/info_box.json'
    }).then(function successCallback(response) {
        $scope.elements = response.data;
    });

}]);