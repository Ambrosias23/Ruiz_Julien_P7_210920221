import React from "react";

export default function Button(props){
    return(
        <div className="button" >
            <input type="submit" value={props.buttonName}></input>
        </div>
    )
}
