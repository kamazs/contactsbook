import React, { Component } from "react";
import ContactsStore from "../flux/ContactsStore.js";
import ContactsActions from "../flux/ContactsActions.js";
import Card from "./Card.js";
import NewCard from "./NewCard.js";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = ContactsStore.all;
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ContactsStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        ContactsStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState(ContactsStore.all);
    }

    render(){
        let contacts = [<li key="new"><NewCard create={ContactsActions.create} edit={true}/></li>];
        for (let key in this.state){
            const obj = this.state[key];
            contacts.push(
                <li key={obj.id}><Card del={ContactsActions.del} update={ContactsActions.update} {...obj}/></li>
            );
        }

        return <div>
            <h1>CRUD CONTACTS BOOK</h1>
            <ul>
                {contacts}
            </ul>
        </div>;
    }
}