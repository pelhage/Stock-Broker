(function() {

  var numbersOnly = function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return parseInt(transformedInput);
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
};


  angular.module('benzingaApp')
    .directive('numbersOnly', numbersOnly);

}());
