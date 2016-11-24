import React, { PureComponent } from "react";

export default class EditableLabel extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            text: props.text
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({
            text: props.text
        });
    }

    onChange(e){
        if (this.props.onChange){
            this.props.onChange(e.currentTarget.value);
        }
        this.setState({ 
            text: e.currentTarget.value
        });
    }

    render() {
        const text = this.state.text;
        if (!this.props.edit){
            return <span>{text}</span>
        } 
        return <input type="text" value={text} onChange={this.onChange}/>;
    }
}

EditableLabel.propTypes = {
    text: React.PropTypes.string
}