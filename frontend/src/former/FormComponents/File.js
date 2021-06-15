import React, { useState } from 'react'

const File = props => {

    const [fileName, setFileName] = useState("")

    const handleChange = e => {
        e.preventDefault()

        if (e.target.files[0] === false) return

        setFileName(e.target.files[0].name)
        props.handleChange({
            target: {
                name: props.name,
                value: props.multiple === true ? e.target.files : e.target.files[0]
            }
        })
    }

    const clear = e => {
        setFileName("")
        props.handleChange({
            target: {
                name: props.name,
                value: false
            }
        })
    }

    return (
        <span className="form-component file">
            <label>{props.label}</label>
            <span>
                {fileName !== "" ? 
                <input
                    type="file"
                    accept={props.accept}
                    multiple={props.multiple}
                    onChange={e => handleChange(e)}
                /> : 
                <input
                    type="file"
                    value=""
                    accept={props.accept}
                    multiple={props.multiple}
                    onChange={e => handleChange(e)}
                />}
                <p>{fileName === "" ? "Choose File" : fileName}</p>
                {fileName !== "" ? <button onClick={e => clear(e)}>Clear</button> : null}
            </span>
        </span>
    )
}

export default File