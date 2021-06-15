import React from 'react'
import PropTypes from 'prop-types'
import Components from "./FormComponents/FormComponents"
import Info from "./Info"

import "./Form.css"

export const datePicker = "DatePicker"
export const file = "File"
export const input = "Input"
export const multipleSelect = "MultipleSelect"
export const select = "Select"

document.addEventListener('click', (e) => {
    const specifiedElement = document.querySelectorAll(".form-parent > form > .select")
    for (const s of specifiedElement)
        if (s.contains(e.target)) return

    for (const s of specifiedElement)
        s.childNodes[2].classList.add("hidden")
})

const Form = props => {

    const fields = props?.fields?.map(field => {
        switch (field.fieldType) {
            case datePicker:
                return (
                    <Components.DatePicker
                        key={field.name}
                        handleChange={props?.handleChange}
                        name={field.name}
                        label={field.label}
                        value={field.value === undefined ? props.data[field.name] : field.value}
                    />
                )
            case file:
                return (
                    <Components.File
                        key={field.name}
                        handleChange={props?.handleChange}
                        name={field.name}
                        label={field.label}
                        value={field.value === undefined ? props.data[field.name] : field.value}
                        multiple={field.multiple === undefined ? false : field.multiple}
                    />
                )
            case input:
                return (
                    <Components.Input
                        key={field.name}
                        handleChange={props?.handleChange}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={field.value === undefined ? props.data[field.name] : field.value}
                        type={field.type}
                    />
                )
            case multipleSelect:
                return (
                    <Components.MultipleSelect
                        key={field.name}
                        handleChange={props?.handleChange}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={field.value === undefined ? props.data[field.name] : field.value}
                        fieldType={field.fieldType}
                        options={field.options}
                        displayField={field.displayField}
                        valueField={field.valueField}
                    />
                )
            case select:
                return (
                    <Components.Select
                        key={field.name}
                        handleChange={props?.handleChange}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={field.value === undefined ? props.data[field.name] : field.value}
                        fieldType={field.fieldType}
                        options={field.options}
                        displayField={field.displayField}
                        valueField={field.valueField}
                    />
                )
            default: return null
        }
    })

    return (
        <div className="form-parent">
            <h3>{props.name}</h3>
            <form>
                {fields}
                {props.overloadedBefore}
                <button onClick={e => props.handleSubmit(e)}> {props.buttonText !== undefined ? props.buttonText : "Submit"} </button>
                {props.overloadedAfter}
                {props.info.type !== null ?
                    <Info type={props.info.type} message={props.info.message} /> : null
                }
            </form>
        </div>
    )

}

Form.propTypes = {
    fields: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
}


export default Form