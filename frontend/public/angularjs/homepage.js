
var app = angular.module("homePage",[]);
app.controller('homePagectr',function($scope, $http){
	$scope.login = function() {
		$http.get('/signin').success(function() {
		console.log("go to sigin");
		}); 
	};
	
	$scope.signup = function() {
		console.log($scope.firstName);
			$http({
				url:'/signup',
				method:'POST',
				data: {"firstName":$scope.firstName, "lastName":$scope.lastName,"email":$scope.email, "password":$scope.password},
				responseType: "json",
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){

		}).error(function(){
			
		});
		
	};
	
});