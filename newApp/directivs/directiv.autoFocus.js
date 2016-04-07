(function(){

    function autoFocus(){
        return {
            restrict: 'A',
            link : function($scope, $element) {
                $element[0].focus();
            }
        }
    }

    angular
        .module('app')
        .directive('autoFocus',autoFocus)
})();