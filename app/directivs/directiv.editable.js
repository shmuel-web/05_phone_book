(function(){
    "use strict";
    //
    //this directive gets a update function to invoke with the freshly edited string
    //optionaly you can add an index attr with the $index of the elment wich was edited
    //and it will be sent as second argument to the invoked function
    //
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
                    scope.$apply();
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