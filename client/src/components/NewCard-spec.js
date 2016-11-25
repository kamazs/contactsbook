import React, { PureComponent } from "react";

/**
 * NON-OOP approach - SPECIALIZATION
 * as recommended by Facebook's best practices:
 * https://facebook.github.io/react/docs/composition-vs-inheritance.html
 */

export default class NewCard extends PureComponent {
    constructor(props){
        super(props);
        this.state  ={
            compact: true
        };
        this.onClick = this.onClick.bind(this);
        this.createCall = this.createCall.bind(this);
    }

    onClick() {
        this.setState({
            compact: !this.state.compact
        });
    }

    createCall(id, data){
        if (this.props.create){
            this.props.create( data );
        }
        this.setState({
            compact: true
        });
    }

    render() {
        if (this.state.compact){
            return <button onClick={this.onClick}>+ Add new contact</button>;
        }
        return <Card name="" surname="" phone="" email="" edit={true} update={this.createCall} del={this.onClick}/>;
    }
} 