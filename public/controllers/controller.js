var myApp = angular.module("myApp", [])
    .controller("AppCtrl", function ($scope, $http) {
        var refresh = function () {

            $http({
                method: 'GET',
                url: '/contactlist'
            }).then(function (response) {
                $scope.contactlist = response.data;
                // $scope.contact = { name: "", email:"", number:"" };
            }, function (error) {

            });

        }


        refresh();

        $scope.addContact = function () {
            $http.post('/contactlist', $scope.contact).then(function (response) {
                refresh();
            }, function (error) {

            });

        }

        $scope.remove = function(id){
            console.log(id);
            $http.delete('/contactlist/'+id).then(function(response){
                refresh();
            });
        }

        $scope.edit = function(id){
            $http.get('/contactlist/'+id).then(function(response){
                $scope.contact=response.data;
            });
        }

        $scope.update = function(){
            console.log($scope.contact._id);
            $http.put('/contactlist/'+$scope.contact._id, $scope.contact).then(function(response){
                refresh();
            });
        }

        $scope.deselect = function(){
            $scope.contact = { name: "", email:"", number:"", _id:"" }
        }
    });

    