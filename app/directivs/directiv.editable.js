(function(){
    "use strict";
    function editable(){
        return {
            restrict: 'A',
            scope:{
                updateFunction: '&editable'
            },
            link : function(scope, element, attrs) {
                element.attr("contenteditable","true");

                element.on('blur',function(){
                    //geting the freshly edited text
                    var newText = element.context.textContent;
                    var index = attrs.index;
                    scope.updateFunction({text:newText,index:index});
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