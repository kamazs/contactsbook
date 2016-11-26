import React, { PureComponent } from "react";
import Entry from "./Entry.js";

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
        if (!this.state.edit){
            if (this.props.del){
                this.props.del(this.props.id);
            }
        } else {
            this.setState({
                edit: false
            });
        }
    }

    onClickEdit() {
        this.setState({
            edit: true
        });
    }

    onClickSubmit() {
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
        return <div className="card">
            <div className="card-corner">
                { 
                    this.state.edit 
                        ? <button onClick={this.onClickSubmit} className="tools">Submit</button>
                        : <button onClick={this.onClickEdit} className="tools">Edit</button>
                }
                <button onClick={this.onClickDelete} className={this.state.edit ? "tools" : "delete"}>{this.state.edit ? "Cancel" : " X "}</button>
            </div>
            <Entry 
                caption="Name"
                edit={this.state.edit} 
                text={this.state.name}
                placeholder="Enter person's first name..."
                onChange={ txt=>{ this.state.name = txt }}/>
            <Entry 
                caption="Surname"
                edit={this.state.edit} 
                text={this.state.surname}
                placeholder="Enter person's last name..."
                onChange={ txt=>{ this.state.surname = txt }}/>
            <Entry 
                caption="Phone"
                edit={this.state.edit} 
                text={this.state.phone}
                placeholder="+37129123457"
                onChange={ txt=>{ this.state.phone = txt }}/>
            <Entry 
                caption="e-mail"
                edit={this.state.edit} 
                text={this.state.email}
                type="email"
                placeholder="example@email.com"
                onChange={ txt=>{ this.state.email = txt }}/>
        </div>
    }
}