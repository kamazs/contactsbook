import React, { PureComponent } from "react";
import classNames from "classnames";

export default class EditableLabel extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            text: props.text || "",
            valid: true
        };
        this.onChange = this.onChange.bind(this);
        this.checkValidity = this.checkValidity.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            text: props.text
        });
    }
    
    test(txt, mode) {
        let regexp = /^/;
        switch (mode){
            case "email":
                regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                break;
            case "tel":
                regexp = /^[0-9\x2D\x2B\x23]+$/;
            default:
                break;
        }

        return regexp.test(txt);
    }

    checkValidity() {
        this.setState({
            valid: this.test(this.input.value, this.props.type)
        });
        return this.state.valid;
    }

    onChange(e){
        if (this.props.onChange){
            this.props.onChange(e.currentTarget.value);
        }
        this.setState({ 
            text: e.currentTarget.value
        });

        this.checkValidity();
    }

    render() {
        const text = this.state.text;
        if (!this.props.edit){
            return <span>{this.props.type === "email" ? <a href={"mailto:" + text}>{text}</a> : text}</span>
        } 
        const currentClassName = classNames({
            "field": this.state.valid,
            "field-wrong": !this.state.valid
        });
        return <input className={currentClassName} type={this.props.type || "text"} value={text} placeholder={this.props.placeholder} onChange={this.onChange} ref={(input)=>{this.input = input;}}/>;
    }
}

EditableLabel.propTypes = {
    text: React.PropTypes.string
}