var app = angular.module('app', ['ngMaterial','angularGrid']);

//Directiva para detectar la pulsación de Enter en el Input de búsqueda.
app.directive('myEnter', function () {
  return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
          if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.myEnter);
              });

              event.preventDefault();
          }
      });
  };
});

app.controller('MainCtrl', function($scope, $http, $q, $mdDialog) {
  var vm = this;
  vm.page = 0;
  vm.loadingMore = false;

  $scope.shots = [];
  $scope.params = {};
  $scope.paramTemp = "";
  $scope.borrar = false;
  $scope.total_imagenes = 0;
  $scope.foto_seleccionada = {};

  //ID de dos usuarios de Unsplash para el desarrollo
  var client_id_1 = "2bf48f853f517d4c5f62e3d5ccd296aac8f0ffa6f0ac47485f71c7423f6f6fa5";
  var client_id_2 = "fa29601ef7eebcbc1e61b2aa3f0b3138a5696ff6c52fd00a5a6acb3a6c0b77e7";
  

  vm.loadMoreShots = function() {
 
    if (($scope.params.keyword != $scope.paramTemp) && ($scope.paramTemp != "")) {
      //Nueva búsqueda, incializo todas las variables.
      $scope.paramTemp = $scope.params.keyword;

      vm.page = 0;
      $scope.shots = [];
      $scope.borrar = false;
      $scope.loadingMore = false;
      $scope.totalImages = 0;
    } else {
      //Se está haciendo scroll
      if (($scope.total_imagenes < 30) && ($scope.params.keyword == $scope.paramTemp)) return; //Prevengo que haga scroll, cuando el contenido de la búsqueda no llega al mínimo de 30 imágnes por página.
      $scope.paramTemp = $scope.params.keyword;
    }

    if(vm.loadingMore) return;
    vm.loadingMore = true;
    var promise = $http.get('https://api.unsplash.com/search/photos?client_id=' + client_id_1 + '&per_page=30&page=' + vm.page +'&query='+$scope.params.keyword);
    promise.then(function(data) {
      //Concateno los arrays de objetos e incremento la página para la siguiente búsqueda.
      $scope.total_imagenes = data.data.total;
      
      var shotsTmp = angular.copy($scope.shots);
      shotsTmp = shotsTmp.concat(data.data.results);
      $scope.shots = shotsTmp;
      
      $scope.borrar = true;
      vm.loadingMore = false;

      //Actualizo el número de página para el scroll
      vm.page++;
    }, function() {
      vm.loadingMore = false;
    });
    return promise;
  };

  vm.loadMoreShots();

  $scope.status = "";
  $scope.customFullscreen = false;

  $scope.showAdvanced = function(ev, shot) {
    $scope.foto_seleccionada = shot.urls.full;
    $mdDialog.show({
      controller: function($scope){
        $scope.foto_seleccionada = shot;
      },
      templateUrl: 'templates/promp1.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status =  answer;
    }, function() {
      $scope.status = 'Dialogo cancelado.';
    });
  };

});
app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
