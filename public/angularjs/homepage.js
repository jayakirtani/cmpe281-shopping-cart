

var app = angular.module("homePage",[]);
app.controller('homePagectr',function($scope, $http,$window){
	$scope.login = function() {
		console.log($scope.firstName);
		
		var hashpassword = md5.createHash($scope.password || '');
			$http({
				url:'/login',
				method:'POST',
				data: {"email":$scope.email, "password":hashpassword},
				responseType: "json",
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){

		}).error(function(){
			
		});
	};
	
	$scope.loginPage = function() {
		$window.location.href = '/login';
	};
	
	$scope.signupPage= function() {
		$window.location.href = '/';
	};
	
	$scope.signup = function() {
	//	console.log($scope.firstName); key should be agreed with backend
		var key = "euhe68vjdr1aX4F091c7aCggSMBf0A7M";
		 var hashpassword = CryptoJS.AES.decrypt(key, $scope.password);
		//var  hashpassword = CryptoJS.enc.Utf8.stringify(decrypted);
		
		console.log("hashpassword", hashpassword);
			$http({
				url:'/signup',
				method:'POST',
				data: {"firstName":$scope.firstName, "lastName":$scope.lastName,"email":$scope.email, "password":hashpassword},
				responseType: "json",
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){

		}).error(function(){
			
		});
		
	};
	
});