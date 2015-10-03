function listMyTask($scope, $http,$timeout) {
	
	// initializing list of cities
	var listOfCities = {
		'cities':[
			{'name':'bangalore','zip':'2295420'},
			{'name':'Pune','zip':'2295412'},
			{'name':'Mumbai','zip':'2295411'},
			{'name':'Chennai','zip':'2295424'}
		]
	};
	console.log($scope.zip);
	$scope.cities = listOfCities.cities;
	
	$scope.checkWeather = function(){
		//console.log($scope.zip);	
		var zip = $scope.zip;
		// invoking the rest call
		$http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20woeid%3D%22' + zip + '%22&format=json&diagnostics=true&callback=').success(function(data) {  // fetch weather
			var weatherResults = data.query.results.channel;
			if(weatherResults.description!='Yahoo! Weather Error'){
				//console.log(weatherResults);
				$scope.weatherResults = weatherResults;
				//populating error variable that will decide the visibility of the weather results
				$scope.error = false;
				
				
				$scope.current = weatherResults.item.description;
				//console.log($scope.current);
				$scope.current = $scope.current.replace(/<a.*>/i,'');
				$scope.current = $scope.current.replace(/<a.*>/i,'');
				$scope.current = $scope.current.replace(/\(provided by/i,'');
				//console.log($scope.current);
				
				// rendering current weather and forcasts as html in a different div 
				document.getElementById('current').innerHTML = $scope.current;
			}
			else{
				// error flag true will hide result section 
				$scope.error = true;
			}
		});

	}
}
