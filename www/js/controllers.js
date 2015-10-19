angular.module('bos-items.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ItemsCtrl', function($scope, itemFactory) {
  $scope.helpers = ionBos.helpers;
  $scope.searchTerm = '';
  $scope.items = [];

  itemFactory.getItems().success(function(res){
    $scope.items = res;
  });

})

.controller('ItemCtrl', function($scope, $stateParams, itemFactory) {
  $scope.helpers = ionBos.helpers;
  $scope.params = $stateParams;
  $scope.item = {};

  var id = parseInt($stateParams.itemId, 10);

  itemFactory.getItems().success(function(res){

    angular.forEach(res, function(item){
      if( item.sid === id){
        $scope.item = item;
      }
    })
  });

  console.log($scope.item);
})

.filter('searchItems', function(){
  return function( items, query){

    if( !query) return items;

    var filtered = [];

    /* RegExp not supported in Android!!
    var textMatch = new RegExp(query, 'i');
    angular.forEach(items, function(item, index){
      if( textMatch.test(item.title)){
        filtered.push(item);
      } else if(textMatch.test(JSON.stringify(item))){
        filtered.push(item);
      }
    });
*/
    query = query.toLowerCase();

    //var exp = '/'+query+'/i';
    angular.forEach(items, function(item, index){
      if( item.title.toLowerCase().indexOf(query) > -1 ){
        filtered.push(item);
      } else if( JSON.stringify(item).toLowerCase().indexOf(query) > -1){
        filtered.push(item);
      }
    });

    return filtered;
  }
})




/*================================
=            Services            =
================================*/
.factory('itemFactory', ['$http', function($http){

  var urlBase = '/';
  var itemFactory = {};

  if(ionic.Platform.isAndroid()){
    urlBase = "/android_asset/www/";
  }

  itemFactory.getItem = function(id){
    /* How to make this async, and where?
    id = parseInt(id, 10);

    itemFactory.getItems().success(function(res){

      angular.forEach(res, function(item){
        if( item.sid === id){
          console.log(item);
          return item;
        }
      })
    });
    */
  };

  itemFactory.getItems = function () {
    return $http.get(urlBase + 'items.json', {cache: true});
  };

  return itemFactory;
}])



;

