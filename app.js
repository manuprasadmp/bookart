var myApp = angular.module("myApp",["ngRoute","ngAnimate"]);
myApp.config(function($routeProvider){
	$routeProvider
		.when("/books",{
			templateUrl:"partials/book-list.html",
			controller:"booksListCtrl"
		})
		.when("/kart",{
			templateUrl:"partials/kart-list.html",
			controller:"kartListCtrl"
		})
		.otherwise({
			redirectTo:"/books"
		});
});
myApp.factory("bookService",function(){
	var books = [
	{
		imgUrl:"images/0804138141.1.zoom.jpg",
		name:"Why Not Me",
		price:"400",
		author:"Mindy kaling",
		description:"sawwwwwwwwwwwwwwwwwwwwwwwww asdfa dasw",
		rating:"4"
	},
	{
		imgUrl:"images/1441038511.jpg",
		name:"Elijha Calling",
		price:"250",
		author:"Ken Mental",
		description:"ds sf asf asfsaf asfasfas ",
		rating:"3"
	},
	{
		imgUrl:"images/index_36.jpg",
		name:"At The Waters Edge",
		price:"650",
		author:"sara greun",
		description:"ds sf asf asfsaf asfasfas yo its the story of a lonley girl sitting at beach side doing nothing ",
		rating:"5"
	},
	{
		imgUrl:"images/0804138141.1.zoom.jpg",
		name:"Why Not Me",
		price:"400",
		author:"Mindy kaling",
		description:"sawwwwwwwwwwwwwwwwwwwwwwwww asdfa dasw",
		rating:"4"
	},
	{
		imgUrl:"images/1441038511.jpg",
		name:"Elijha Calling",
		price:"250",
		author:"Ken Mental",
		description:"ds sf asf asfsaf asfasfas ",
		rating:"3"
	},
	{
		imgUrl:"images/index_36.jpg",
		name:"At The Waters Edge",
		price:"650",
		author:"sara greun",
		description:"ds sf asf asfsaf asfasfas yo its the story of a lonley girl sitting at beach side doing nothing ",
		rating:"5"
	}
	];
	return {
		getBooks:function(){
			return books;
		}
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
myApp.controller("booksListCtrl",function($scope,bookService,kartService){
	$scope.books = bookService.getBooks();
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
