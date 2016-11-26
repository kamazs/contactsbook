import React from "react";

export default (props)=>{
    if (props.warning){
        return <div className="confirmation-container">
            <div className="confirmation-info">{props.warning}</div>
            <div className="confirmation-controls">
                <button className="confirmation-button-yes" onClick={props.onYes}>{props.yes}</button>
                <button className="confirmation-button-no" onClick={props.onNo}>{props.no}</button>
            </div>
        </div>
    }
    return null;
}