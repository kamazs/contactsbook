import React from "react";
export default (props)=>{
    if (!props.forceVisible && (!props.value || props.value.trim()=="")){
        return null;
    } 
    return props.children;
}