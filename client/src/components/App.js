import React, { Component } from "react";
import ContactsStore from "../flux/ContactsStore.js";
import ContactsActions from "../flux/ContactsActions.js";
import Card from "./Card.js";
import NewCard from "./NewCard.js";

require("../../styles/main.scss");

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
        let list = [];//[<NewCard key="new" create={ContactsActions.create}/>];
        for (let key in this.state.contacts){
            let obj = this.state.contacts[key];
            list.push(
                <Card key={obj.id} del={ContactsActions.del} update={ContactsActions.update} {...obj}/>
            );
        }

        return <div>
            <div className="app-container">
                <div className="header-container">
                    <h1>CRUD CONTACTS BOOK</h1>
                    <input className="searchbar" type="text" onChange={this.onFilter} placeholder="Start typing here to filter contacts..."/>
                </div>
                <div className="contacts-container-wrapper">
                    <div className="contacts-container">
                        {list}
                    </div>
                </div>
                <div className="contacts-bottomcorner-fixed">
                    <NewCard key="new" create={ContactsActions.create}/>
                </div>
            </div>
            
        </div>;
    }
}