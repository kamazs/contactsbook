import React from "react";
import Card from "./Card.js";

export default class NewCard extends Card {
    constructor(props){
        super(props);
        this.state = Object.assign({edit: false}, this.state);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            edit: !this.state.edit
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
        this.setState({edit:false});
    }

    render(){
        if (!this.state.edit){
            return <button className="new" onClick={this.onClick}> +Add</button>
        }
        return super.render();
    }
}