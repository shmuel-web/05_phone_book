(function(){
    "use strict";
    function MainCtrl (phoneBookService){
        this.index = 0;
        this.phoneBook = phoneBookService;
        this.phoneBook.readFromLocal();
        this.currentItem = this.phoneBook.root;
        this.currentItem.url = "newApp/partials/root.html";
    }

    MainCtrl.prototype.test = function(){
        console.log(this.currentItem);
    };

    MainCtrl.prototype.changeCurrentItem = function(id){
    //    get item by "id"
        var item = this.phoneBook.getItemById(id);
        //    chek if it is root group or contact
        //    & update the url value to the proper partial template url accordingly
        if (item.fName){
            this.currentItem = item;
            this.currentItem.url = "newApp/partials/contact.html";
        }
        else if(item.name && item.name != "Root"){
            this.currentItem = item;
            this.currentItem.url = "newApp/partials/group.html";
        }
        else if (item.name == "Root"){
            this.currentItem = item;
            this.currentItem.url = "newApp/partials/root.html";
        }
    };

    MainCtrl.prototype.up = function(){
        this.changeCurrentItem(this.currentItem.parent.id);
    };

    MainCtrl.prototype.reset = function(){
        this.phoneBook.reset();
    };

    MainCtrl.prototype.addNumberForm = function(){
        console.log('addContactForm');
        this.numberForm = true;
    };

    MainCtrl.prototype.addContactForm = function(){
        console.log('addContactForm');
        this.ContactForm = true;
        this.GroupFrom = false;
    };

    MainCtrl.prototype.addGroupFrom = function(){
        console.log('addGroupFrom');
        this.GroupFrom = true;
        this.ContactForm = false;
    };

    app.controller('MainCtrl',['phoneBookService',MainCtrl]);
})();