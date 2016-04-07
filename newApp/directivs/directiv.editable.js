(function(){
    "use strict";
    function editable(){
        return {
            restrict: 'A',
            link : function(scope, element, attrs) {
                element.attr("contenteditable","true");

                element.on('blur',function(){
                    //geting the freshly edited text
                    var text = element.context.textContent;
                    scope.ctrl.updateItemName(text);
                }).on('keypress',function(event){
                    if (event.which === 13){
                        event.preventDefault();
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