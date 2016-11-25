import React, { PureComponent } from "react";
import EditableLabel from "./EditableLabel.js";

export default class Card extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            surname: props.surname,
            phone: props.phone,
            email: props.email,
            edit: props.edit
        };
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.name == newProps.name && 
            this.state.surname == newProps.surname &&
            this.state.phone == newProps.phone &&
            this.state.email == newProps.email){
                return;
            }

        this.setState({
            name: newProps.name,
            surname: newProps.surname,
            phone: newProps.phone,
            email: newProps.email,
            edit: newProps.edit
        });
    }

    onClickDelete(){
        if (this.props.del){
            this.props.del(this.props.id);
        }
    }

    onClickEdit() {
        this.setState({
            edit: true
        });
    }

    onClickSubmit() {
        console.log("props: ", this.props, "state:", this.state);
        if (this.props.update){
            this.props.update(this.props.id, {
                name: this.state.name,
                surname: this.state.surname,
                phone: this.state.phone,
                email: this.state.email
            });
        }
        this.setState({
            edit: false
        });
    }

    render() {
        return <div>
            <div>
                <span>Name: </span>
                <EditableLabel 
                    text={this.state.name} 
                    edit={this.state.edit} 
                    onChange={ txt=>{ this.state.name = txt }}
                />
            </div>
            <div>
                <span>Surname: </span>
                <EditableLabel 
                    text={this.state.surname} 
                    edit={this.state.edit} 
                    onChange={ txt=>{ this.state.surname = txt }}
                />
            </div>
            <div>
                <span>Phone: </span>
                <EditableLabel 
                    text={this.state.phone} 
                    type="tel"
                    edit={this.state.edit} 
                    onChange={ txt=>{ this.state.phone = txt }}
                />
            </div>
            <div>
                <span>e-mail: </span>
                <EditableLabel 
                    text={this.state.email} 
                    edit={this.state.edit} 
                    type="email"
                    onChange={ txt=>{ this.state.email = txt }}
                />
            </div>
            { 
                this.state.edit 
                    ? <button onClick={this.onClickSubmit}>Submit</button>
                    : <button onClick={this.onClickEdit}>Edit</button>
            }
            <button onClick={this.onClickDelete}>Delete</button>
        </div>
    }
}