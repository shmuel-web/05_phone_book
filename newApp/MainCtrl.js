(function(){
    function MainCtrl (){
        this.index = 0;
        this.phoneBook = new BL.PhoneBook;
        this.currentItem = this.phoneBook.root;
    }

    MainCtrl.prototype.test = function(){
        console.log(this.currentItem);
    };

    MainCtrl.prototype.up = function(){
        //dispaly parent
        //change current item
    };

    MainCtrl.prototype.reset = function(){
        this.phoneBook.reset();
    };

    app.controller('MainCtrl',MainCtrl);
})();