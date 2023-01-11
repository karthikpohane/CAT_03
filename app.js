angular.module("routeApp", ["ngRoute"])
.controller('MyController', function ($scope, $http) {
    $http.get('http://localhost:3000/').then(function (response) {
        $scope.datas = response.data
    })
})
    .controller('homeController', function ($scope, $http) {
        // $scope.name = "Aboutkk scope"
        $http.get('data.json').then(function (response) {
            $scope.datas = response.data;
        });
        

      // $scope.rowLimit = 3;
    //  $scope.limit = 3;

        $scope.order = "";
        $scope.genderCase = "uppercase";


        $scope.setName = function () {
            if ($scope.order === "name") {
                $scope.order = "-name";
                return;
            }
            $scope.order = "name";
        }

        $scope.setAge = function () {
            if ($scope.order === "age") {
                $scope.order = "-age";
                return;
            }
            $scope.order = "age";
        }

        $scope.setGender = function () {
            if ($scope.order === "gender") {
                $scope.order = "-gender";
                return;
            }
            $scope.order = "gender";
        }

        $scope.setDob = function () {
            if ($scope.order === "date") {
                $scope.order = "-date";
                return;
            }
            $scope.order = "date";
        }
        $scope.setBookDate = function () {
            if($scope.order === "book_Date") {
                $scope.order = "-book_Date";
                return;
            }
            $scope.order = "book_Date";
        }

        
    })
    .controller("searchController", function ($scope, $rootScope) {
        $scope.item = "";
        $scope.setSearch = function () {
            $rootScope.search = $scope.item;
        }
    })

    .controller('deleteController', function ($scope, $http) {
        $http.get('http://localhost:3000/').then(function (response) {
            $scope.datas = response.data
        })
        $scope.deleteEntry = function () {
            var delJson = { delID: $scope.del.id }
            var jsonObj = JSON.stringify(delJson)

            fetch('http://localhost:3000/delete', {
                method: "POST",
                body: jsonObj,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
            $scope.del = ""
        }
    })

    .controller('createController', function ($scope) {
        $scope.createEntry = function () {
            var newData = "{\"id\":\"" + $scope.id + "\", \"name\":\"" + $scope.name + "\", \"sal\":\"" + $scope.sal + "\", \"loc\":\"" + $scope.loc + "\", \"dept\":\"" + $scope.dept + "\"}";

            fetch('http://localhost:3000/new', {
                method: "POST",
                body: newData,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
            $scope.id=""
            $scope.name=""
            $scope.sal=""
            $scope.loc=""
            $scope.dept=""
        };
    })

    .controller('updateController', function ($scope, $http) {
        $http.get('http://localhost:3000/').then(function (response) {
            $scope.datas = response.data
        })

        $scope.getId = function () {
            var selectedId = $scope.id
            console.log(selectedId)
            $scope.name = selectedId['name']
            $scope.sal = selectedId['sal']
            $scope.loc = selectedId['loc']
            $scope.dept = selectedId['dept']
        }

        $scope.updateEntry = function () {
            var newData = "{\"id\":\"" + $scope.id['id'] + "\", \"name\":\"" + $scope.name + "\", \"sal\":\"" + $scope.sal + "\", \"loc\":\"" + $scope.loc + "\", \"dept\":\"" + $scope.dept + "\"}";
            console.log(newData)
            fetch('http://localhost:3000/update', {
                method: "POST",
                body: newData,
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(err => console.log(err))
            $scope.id=""
            $scope.name=""
            $scope.sal=""
            $scope.loc=""
            $scope.dept=""
        };
    })


    .controller('searchController', function ($scope, $rootScope) {
        $scope.getData = function () {
            var searchJson = { dept: $scope.dept }
            var jsonObj = JSON.stringify(searchJson)
            fetch('http://localhost:3000/search', {
                method: "POST",
                body: jsonObj,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                $scope.datas = json
            })
            .catch(err => console.log(err))
        }
    })

    
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html",
                controller: "MyController"
            })
            .when("/facilitiesprovided", {
                templateUrl: "FacilitiesProvided.html",
                controller: "homeController"
            })
            .when("/create", {
                templateUrl: "create.html",
                controller: "createController"
            })
            .when("/view", {
                templateUrl: "view.html",
                controller: "MyController"
            })
            .when("/update", {
                templateUrl: "update.html",
                controller: "updateController"
            })
            .when("/delete", {
                templateUrl: "delete.html",
                controller: "deleteController"
            })
            .when("/search", {
                templateUrl: "search.html",
                controller: "searchController"
            });
    })
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])