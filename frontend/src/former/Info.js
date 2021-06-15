import React from "react"


const Info = props => {
    return (
        <div className={"info " + props.type}>
            <p>{props.message}</p>
        </div>
    )
}

export default Info