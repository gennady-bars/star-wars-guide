angular.module('StarWarsApp')
	.factory('characterFactory', ['$http', 'titleCase', function($http, titleCase){

		var pageNumber = 1;
		var people = [];
		var personDetails = function(value){
			return {
				name: titleCase(value.name),
				birth_year: getYear(value.birth_year),
				hair_color: titleCase(value.hair_color),
				skin_color: titleCase(value.skin_color),
				gender: titleCase(value.gender),
				height: getHeight(value.height),
				mass: getMass(value.mass)
			};
		};

		var getMass = function(value){
			if(value === 'unknown'){
				return 'Unknown';
			}

			return value + 'kg';
		};

		var getHeight = function(value){
			if(value === 'unknown'){
				return 'Unknown';
			}

			return value + 'cm';
		};

		var getYear = function(value){
			if(value === 'unknown'){
				return 'Unknown';
			}

			return value;
		};

		return {
			getAll: function(callback)	{
				console.log('function called');
				$http.get('http://swapi.co/api/people/?page=' + pageNumber)
					.then(function(response) {
						var peopleResponse = response.data.results;
						var newPeople = [];

						newPeople = peopleResponse.map(function(value){
							return personDetails(value);
						});

						people.push.apply(people, newPeople);

						pageNumber++;
						callback(null, people);
					}, function(err) {
						callback(err);
				});
			},

			getByUrl: function(url, callback){
				$http.get(url).then(function(response){
					var character = personDetails(response);
					callback(null, character);
				}, function(err){
					callback(err);
				});
			}
		};
	}]);