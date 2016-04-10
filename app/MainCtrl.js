(function(){
    "use strict";
    function MainCtrl (phoneBookService,$scope) {
        var vm = this
        vm.phoneBook = phoneBookService;
        vm.phoneBook.readFromLocal();
        vm.currentItem = this.phoneBook.root;
        vm.currentItem.url = "app/partials/main_views/root.html";
        vm.$scope = $scope;
        //for learning perpesess
        vm.test = function(text){
            console.log(text);
        };
        //when the user blurs the edit mode or press enter
        //this.updateItemName = function (newName) {
        //
        //    if (newName != "") {
        //        this.currentItem.changeName(newName);
        //        this.phoneBook.writeToLocal();
        //    }
        //    else {
        //        //ask the user if he wishes to delete the item
        //        this.deleteItem();
        //    }
        //};
    }

    MainCtrl.prototype.editMode = function(){
        $('#title').focus();
    };

    MainCtrl.prototype.displayChildItem = function(item){
    //    creates a slide out animation renders the html and creates a slide in animation
        var main = $('#main');
        var self = this;
        self.displayCurrentItem(item);
    };


    MainCtrl.prototype.displayCurrentItem = function(item,callback){

        //    chek if it is root group or contact or search results item
        //    & update the url value to the proper partial template url accordingly
        if (item.fName){
            this.currentItem = item;
            this.currentItem.url = "app/partials/main_views/contact.html";
        }
        else if(item.name && item.name != "Root"){
            this.currentItem = item;
            this.currentItem.url = "app/partials/main_views/group.html";
        }
        else if (item.name == "Root"){
            this.currentItem = item;
            this.currentItem.url = "app/partials/main_views/root.html";
        }
        else if (item.searchResult){
            this.currentItem = item;
            this.currentItem.url = "app/partials/main_views/searchResults.html";
        }
        this.hideForm();
        if (callback){
            callback();
        }

    };

    MainCtrl.prototype.up = function(){
        this.displayCurrentItem(this.currentItem.parent);
    };

    MainCtrl.prototype.back = function(){
        this.displayCurrentItem(this.currentItem.backItem);
    };

    MainCtrl.prototype.hideForm = function(){
        this.showContactForm = false;
        this.showGroupFrom = false;
        this.showNumberForm = false;
    };

    MainCtrl.prototype.reset = function(){

        $('#reset-modal').openModal();
        var self = this;
        $('#reset-confirm').one('click',function(){
            var content = '<i class="material-icons small red-text">restore</i><span>your phone book is set bck to default </span>';
            Materialize.toast(content, 4000);
            self.phoneBook.reset();
            self.displayChildItem(self.phoneBook.root);
            self.$scope.$apply();
        });

    };

    MainCtrl.prototype.addNumberForm = function(){
        console.log('addContactForm');
        this.showNumberForm = true;
    };

    MainCtrl.prototype.showAddContactForm = function(){
        console.log('addContactForm');
        this.showContactForm = true;
        this.showGroupFrom = false;
    };

    MainCtrl.prototype.showAddGroupFrom = function(){
        console.log('addGroupFrom');
        this.showGroupFrom = true;
        this.showContactForm = false;
    };

    MainCtrl.prototype.addGroupFormHandler = function(){
        var self = this;
        this.currentItem.addSubGroup(this.groupName ,function(){
            var content = '<i class="material-icons small green-text">done</i><span>a new group was added successfully </span>';
            self.groupName = "";
            self.hideForm();
            self.phoneBook.writeToLocal();
            Materialize.toast(content, 4000);
        })
    };

    MainCtrl.prototype.addNumberFormHandler = function(){
        var self = this;
        this.currentItem.addPhoneNumber(this.number ,function(){
            var content = '<i class="material-icons small green-text">done</i><span>the number was added successfully </span>';
            self.number = "";
            self.hideForm();
            self.phoneBook.writeToLocal();
            Materialize.toast(content, 4000);
        })
    };

    MainCtrl.prototype.addContactFormHandler = function(){
        var self = this;
        this.currentItem.addContact(this.fName, this.lName, [this.number] ,function(){
            var content = '<i class="material-icons small green-text">done</i><span>a new contact was added successfully </span>';
            self.fName = "";
            self.lName = "";
            self.number = "";
            self.hideForm();
            self.phoneBook.writeToLocal();
            Materialize.toast(content, 4000);
        })
    };
    /*//when the user blurs the edit mode or press enter
    MainCtrl.prototype.updateItemName = function(event){
        //the freshly edited item name
        var newName = event.target.textContent.trim();


            if (event.type == "blur"){
                if (newName != ""){
                    var newName = event.target.textContent;
                    this.currentItem.changeName(newName);
                    this.phoneBook.writeToLocal();
                }
                else {
                    //ask the user if he wishes to delete the item
                    this.deleteItem();
                }

            }
            else if (event.type == "keypress" && event.keyCode == 13){
                event.preventDefault();
                event.target.blur();//which fires the blur event and does all the above
            }


    };*/

    //when the user blurs the edit mode or press enter
    MainCtrl.prototype.updateItemName = function(newName){

        if (newName != ""){
            var newName = event.target.textContent;
            this.currentItem.changeName(newName);
            this.phoneBook.writeToLocal();
        }
        else {
            //ask the user if he wishes to delete the item
            this.deleteItem();
        }
    };

    //when the user blurs the edit mode or press enter
    MainCtrl.prototype.editPhoneNumber = function(event,index){
        //the freshly edited item name
        var newNum = event.target.textContent;

        if (event.type == "blur"){
            if (newNum != "") {
                this.currentItem.changePhoneNum(newNum, index);
                this.phoneBook.writeToLocal();
            }
            else {
                //if the user submited a blank string then its probbely a mistake or that he wishes to delete the item
                //    todo ask the user if he wishes to delete the item if not do nothing
                this.deletePhoneNum(index);
            }
        }
        else if (event.type == "keypress" && event.keyCode == 13){
            event.preventDefault();
            event.target.blur();//which fires the blur event and does all the above
        }

    };

    MainCtrl.prototype.deletePhoneNum = function(index){

        $('#delete-modal').openModal();
        var self = this;
        $('#delete-confirm').one('click',function(){
            self.currentItem.deletePhoneNum(index);
            var content = '<i class="material-icons small red-text">delete</i><span>the phone number was deleted </span>';
            Materialize.toast(content, 4000);
            self.phoneBook.writeToLocal();
            self.$scope.$apply();
        });
    };

    MainCtrl.prototype.deleteItem = function(){
        $('#delete-modal').openModal();
        var self = this;
        $('#delete-confirm').one('click',function(){
            var content = '<i class="material-icons small red-text">delete</i><span>the item was deleted </span>';
            Materialize.toast(content, 4000);
            var parent = self.currentItem.parent;
            self.phoneBook.deleteItem(self.currentItem.id);
            self.currentItem = parent;
            self.$scope.$apply();
        });
    };

    MainCtrl.prototype.search = function(event) {
        var results = this.phoneBook.search(this.searchParam);
        var resObj = {
            searchResult:true,
            searchParam:this.searchParam,
            childItems:results,
            backItem:this.currentItem
        };
        this.displayCurrentItem(resObj);
        this.searchParam = "";
        var inputField = event.target.firstElementChild.firstElementChild;
        inputField.blur();
    };

    angular
        .module('app')
        .controller('MainCtrl',['phoneBookService','$scope',MainCtrl]);
})();