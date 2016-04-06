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

    MainCtrl.prototype.displayCurrentItem = function(item){

        //    chek if it is root group or contact or search results item
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
        else if (item.searchResult){
            this.currentItem = item;
            this.currentItem.url = "newApp/partials/searchResults.html";
        }
        this.hideForm();

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
        this.phoneBook.reset();
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
    //when the user blurs the edit mode or press enter
    MainCtrl.prototype.updateItemName = function(event){
        //the freshly edited item name
        var newName = event.target.textContent.trim();

        if (newName != ""){
            if (event.type == "blur"){
                var newName = event.target.textContent;
                this.currentItem.changeName(newName);
                this.phoneBook.writeToLocal();
            }
            else if (event.type == "keypress" && event.keyCode == 13){
                event.preventDefault();
                event.target.blur();//which fires the blur event and does all the above
            }
        }
        else {
            //if the user submited a blank string then its probbely a mistake or that he wishes to delete the item
            //    todo ask the user if he wishs to delete he item if not do nothing
            event.preventDefault();
        }

    };

    MainCtrl.prototype.deleteItem = function(){
        this.phoneBook.deleteItem(this.currentItem.id);
        var content = '<i class="material-icons small red-text">delete</i><span>' + this.currentItem.name + ' was deleted </span>';
        Materialize.toast(content, 4000);
        this.currentItem = this.currentItem.parent;
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

    app.controller('MainCtrl',['phoneBookService',MainCtrl]);
})();