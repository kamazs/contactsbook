import AppDispatcher from "./AppDispatcher.js";
import Events from "events"; 
import ContactsConstants from "./ContactsConstants.js";

const CHANGE_EVENT = "change";

class ContactsStore extends Events.EventEmitter {
    constructor(props){
        super(props);
        this.contacts = {
            "1": { id: 1, name: "Janis", surname: "Kalnins", phone: "29567888", email: "janis.kalnins@gmail.com" },
            "2": { id: 2, name: "Igors", surname: "Lejins", phone: "20357172", email: "igorz1985xxx@inbox.lv" },
        };
        this.dispatcherIdx = AppDispatcher.register(this.handleAction.bind(this));
        this.lastID = Object.keys(this.contacts).length+1;
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
        return true;
    }

    create(data) {
        this.contacts[this.lastID] = Object.assign( {id: this.lastID}, data );
        this.lastID++;
    }

    update(id, data) {
        //Object.assign(this.contacts[id], data);
        this.contacts[id] = Object.assign( {id: id}, data );
    }

    del(id){
        delete this.contacts[id];
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