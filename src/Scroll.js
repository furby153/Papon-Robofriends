import React from "react";

const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll', border: '3px solid white', height:'770px'}}>
            {props.children}
        </div>
    )
}

export default Scroll;