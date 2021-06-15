import React from 'react'

const Input = props => {

    return (
        <span className="form-component input">
            <label> {props.label} </label>
            {props.type !== "textarea" ?
                (
                    <input
                        className="input"
                        type={props.type}
                        name={props.name}
                        value={props.value === undefined ? "" : props.value}
                        placeholder={props.placeholder}
                        onChange={e => props.handleChange(e)}
                    />
                ) :
                (
                    <textarea
                        className="input"
                        type={props.type}
                        name={props.name}
                        value={props.value === undefined ? "" : props.value}
                        placeholder={props.placeholder}
                        onChange={e => props.handleChange(e)}
                    />
                )
            }
        </span>
    )
}

export default Input