(function(){
    "use strict";
    function editable(){
        return {
            restrict: 'A',
            link : function(scope, element, attrs) {
                element.on('blur',function(){
                    attrs();
                });
                element.on('keypress',function(event){
                    if (event.which === 13){
                        event.preventDefault;
                        element.blur();
                    }
                })
            }
        }
    }

    angular
        .module('app')
        .directive('editable',editable)
})();