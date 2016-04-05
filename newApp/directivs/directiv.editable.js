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

(function(){
    function editable (scope, element, attrs){
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.editable);
                });

                event.preventDefault();
            }
        });

        element.bind("blur", function (event) {
            scope.$apply(function (){
                scope.$eval(attrs.editable);
            });

            event.preventDefault();
        });

    }

    app.directive('editable', editable)
})();