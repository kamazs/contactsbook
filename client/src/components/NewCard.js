import React, { PureComponent } from "react";
import Card from "./Card.js";

export default class NewCard extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            compact: true
        }
        this.onClick = this.onClick.bind(this);
    }

    /*componentWillReceiveProps(props){
        this.setState({
            compact: props.compact
        });
        this.super(props);
    }*/

    onClick() {
        this.setState({
            compact: false
        });
    }

    onSubmit() {
        if (this.props.update){
            this.props.update();
        }
    }

    render() {
        if (this.state.compact){
            return <button onClick={this.onClick}>+ Add new contact</button>;
        }
        return <Card {...this.props} update={this.onSubmit}/>;
    }
} 