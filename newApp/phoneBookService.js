(function(){
    function phoneBookService(){
        var phoneBook = new BL.PhoneBook;
        return phoneBook;
    }

    angular
        .module('app')
        .factory('phoneBookService',phoneBookService);
})();
