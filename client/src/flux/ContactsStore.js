import AppDispatcher from "./AppDispatcher.js";
import Events from "events"; 
import axios from "axios";
import ContactsConstants from "./ContactsConstants.js";

const CHANGE_EVENT = "change";

class ContactsStore extends Events.EventEmitter {
    constructor(props){
        super(props);
        this.contacts = {};
        this.dispatcherIdx = AppDispatcher.register(this.handleAction.bind(this));
        this.updateLastID();

        this.dbSync();
    }

    dbSync() {
        axios.get("/all")
            .then(response=>{
                console.log("response: ", response);
                response.data.forEach(contact=>{
                    this.contacts[contact.id || "0"] = contact;
                });
                this.updateLastID();
                this.emit(CHANGE_EVENT);
            })
            .catch(err=>{
                console.log("ERROR: ", err);
            });
    }

    updateLastID() {
        console.log("this.contacts: ", this.contacts, Object.keys(this.contacts).map(c=>+c));
        this.lastID = 1 + Math.max( ...Object.keys(this.contacts).map(c=>+c) );
        console.log("lastID:", this.lastID);
    }

    handleAction(payload) {
        const action = payload.action;
        switch (action.actionType){
            case ContactsConstants.CONTACT_CREATE:
                this.create(action.params);
                break;
            case ContactsConstants.CONTACT_UPDATE: 
                this.update(action.id, action.params);
                break;
            case ContactsConstants.CONTACT_DELETE:
                this.del(action.id);
                break;
            default:
                return true;
        }

        this.emit(CHANGE_EVENT);
        this.dbSync();

        return true;
    }

    create(data) {
        this.contacts[this.lastID] = Object.assign( {id: this.lastID}, data );
        
        axios.post("/create", this.contacts[this.lastID])
            .then(response=>{
                console.log("User addition response: ", response);
            })
            .catch(err=>{
                console.log("Create error: ", err);
            });
        
        this.lastID++;
    }

    update(id, data) {
        this.contacts[id] = Object.assign( {id: id}, data );

        axios.post("/update", this.contacts[id])
            .then(response=>{
                console.log("User updated response: ", response);
            })
            .catch(err=>{
                console.log("Update error: ", err);
            });
    }

    del(id){
        delete this.contacts[id];

        axios.post("/delete", {id: id})
            .then(response=>{
                console.log("User delete response: ", response);
            })
            .catch(err=>{
                console.log("Delete error: ", err);
            });
    }

    get all() {
        return this.contacts;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeChangeListener(callback);
    }
}

export default new ContactsStore();