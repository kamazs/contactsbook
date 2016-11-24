import AppDispatcher from "./AppDispatcher.js";
import ContactsConstants from "./ContactsConstants.js";

class ContactsActions {
    create(data){
        console.log("data @ ActionCr: ", data);
        AppDispatcher.handleViewAction({
            actionType: ContactsConstants.CONTACT_CREATE,
            params: data
        });
    }

    update(id, data) {
        AppDispatcher.handleViewAction({
            actionType: ContactsConstants.CONTACT_UPDATE,
            id: id,
            params: data
        });
    }

    del(id) {
        AppDispatcher.handleViewAction({
            actionType: ContactsConstants.CONTACT_DELETE,
            id: id
        });
    }
}

export default new ContactsActions();