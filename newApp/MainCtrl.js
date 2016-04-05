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

    MainCtrl.prototype.displayCurrentItem = function(id){
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
        this.hideForm();

    };

    MainCtrl.prototype.up = function(){
        this.displayCurrentItem(this.currentItem.parent.id);
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

    MainCtrl.prototype.updateItemName = function(event){
        var newName = event.target.textContent.trim();

        if (newName != ""){
            if (event.type == "blur"){
                var newName = event.target.textContent;
                this.currentItem.changeName(newName);
                this.phoneBook.writeToLocal();
            }
            else if (event.type == "keypress" && event.keyCode == 13){
                event.preventDefault();
                event.target.blur();
            }
        }
        else {
            //    todo ask the user if he wishs to delete he item if not do nothing
            event.preventDefault();
        }

    };

    app.controller('MainCtrl',['phoneBookService',MainCtrl]);
})();