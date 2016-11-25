import React from "react";
import Card from "./Card.js";

export default class NewCard extends Card {
    constructor(props){
        super(props);
        this.state = Object.assign({compact: true, edit: true}, this.state);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            compact: !this.state.compact
        });
    }

    onClickSubmit() {
        console.log("New card overrided function call");
        if (this.props.create){
            this.props.create({
                name: this.state.name, 
                surname: this.state.surname,
                phone: this.state.phone, 
                email: this.state.email
            });
        }
        this.setState({compact:true});
    }

    onClickDelete(){
        this.onClick();
    }

    render(){
        if (this.state.compact){
            return <div className="card"><button className="new" onClick={this.onClick}> + Add new contact</button></div>
        }
        return super.render();
    }
}