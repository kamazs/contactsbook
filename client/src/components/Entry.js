import React from "react";
import HideEmpty from "./HideEmpty.js";
import EditableLabel from "./EditableLabel.js";

export default (props)=>{
    return <HideEmpty forceVisible={props.edit} value={props.text}>
        <div className="keypair">
            <span className="label-key">{props.caption}: </span>
            <EditableLabel 
                text={props.text} 
                edit={props.edit} 
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    </HideEmpty>
}