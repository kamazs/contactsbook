import React, { Component } from "react";
import ContactsStore from "../flux/ContactsStore.js";
import ContactsActions from "../flux/ContactsActions.js";
import Card from "./Card.js";
import NewCard from "./NewCard.js";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts: ContactsStore.all
        };
        this.filterString = "";
        this.onChange = this.onChange.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    componentDidMount() {
        ContactsStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        ContactsStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            contacts: this.getFilteredContacts(ContactsStore.all, this.filterString)
        });
    }

    getFilteredContacts(allContacts, filterString){
        let contacts = [];
        for (let key in allContacts){
            contacts.push(allContacts[key]);
        }

        if (filterString!=""){
            contacts = contacts.filter(x=>{
                if (x.name.toLowerCase().includes(filterString) ||
                    x.surname.toLowerCase().includes(filterString) ||
                    x.phone.includes(filterString) ||
                    x.email.toLowerCase().includes(filterString) ){
                        return true;
                    }
                return false;
            });
        }
        contacts.sort((a,b)=>a.name>b.name);

        return contacts;
    }

    onFilter(e) {
        this.filterString = e.currentTarget.value.toLowerCase().trim();

        this.setState({
            contacts: this.getFilteredContacts(ContactsStore.all, this.filterString)
        });
    }

    render(){
        let list = [<li key="new"><NewCard create={ContactsActions.create} edit={true}/></li>];
        for (let key in this.state.contacts){
            let obj = this.state.contacts[key];
            list.push(
                <li key={obj.id}><Card del={ContactsActions.del} update={ContactsActions.update} {...obj}/></li>
            );
        }

        return <div>
            <h1>CRUD CONTACTS BOOK</h1>
            <input type="text" onChange={this.onFilter}/>
            <ul>
                {list}
            </ul>
        </div>;
    }
}