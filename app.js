var myApp = angular.module("myApp",["ngRoute","ngAnimate"]);

myApp.config(function($routeProvider){
	$routeProvider
		.when("/books",{
			templateUrl:"partials/book-list.html",
			controller:"booksListCtrl",
			resolve: {
                data: function(bookService){
                	return bookService.getBooks()
                }
            }
		})
		.when("/kart",{
			templateUrl:"partials/kart-list.html",
			controller:"kartListCtrl"
		})
		.otherwise({
			redirectTo:"/books"
		});
});

myApp.service("bookService",function($http,$q){
	
	this.getBooks=function(){
		var defer = $q.defer();
		$http.get("json/book.json").success(function(data){
				defer.resolve(data);
				
			});

			return defer.promise;
	}
});

myApp.factory("kartService", function() {
	var kart = [];

	return {
		getKart:function(){
			return kart;
		},
		addToKart:function (book) {
			var canAdd = true;
			if(kart.length!=0){
				for(var i=0;i<kart.length;i++){
					if(kart[i].name==book.name)
						canAdd = false;
					}
				if(canAdd)
					kart.push(book);
				else
					alert("Already added to kart");
			}
			else
				kart.push(book);
			
		},
		buy:function(book){
			alert("Thanks for buying "+book.name);
		}
	}
});

myApp.controller("headerCtrl",function($scope,$location){
	$scope.appDetails = {
		title : "Bookart",
		tagline : "we have 1 million books for you"
	};
	$scope.nav={};
	$scope.nav.isActive = function(path){
		if(path===$location.path())
			return true;
		else
			return false;
	}

});

myApp.controller("booksListCtrl",function($scope,bookService,kartService,data){
	$scope.books = data;
	$scope.addToKart = function(book){
		kartService.addToKart(book);
	}
});

myApp.controller("kartListCtrl",function($scope,kartService){
	$scope.kart=kartService.getKart();
	$scope.buy = function(book){
		kartService.buy(book);
	} 

});

