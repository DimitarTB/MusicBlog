import React, { useState, useEffect } from 'react'
import { AiOutlineCheck } from "react-icons/ai"

const MultipleSelect = props => {

    const [selected, setSelected] = useState(props.value)
    const [searchFilter, setSearchFilter] = useState("")

    const toggle = value => {
        const temp = selected?.length === undefined ? [] : selected
        if (temp.includes(value)) setSelected(temp.filter(val => val !== value))
        else setSelected([...temp, value])
    }

    let options = []

    if (searchFilter.length > 3) options = props?.options.filter(opt => opt[props.displayField].includes(searchFilter) === true)
    else options = props?.options

    options = options?.map(opt => {
        return {
            label: opt[props.displayField],
            value: opt[props.valueField],
            checked: selected?.includes(opt[props.valueField]) === true ? true : false
        }
    })

    const generateValue = () => {
        const temp = selected?.length === undefined ? [] : selected
        const current = options.filter(opt => temp.includes(opt.value) === true)
        let string = ""
        for (const item of current)
            string += item.label + ", "

        return string.substring(0, string.length - 2)
    }

    const [display, setDisplay] = useState(generateValue())

    useEffect(() => {
        setDisplay(generateValue())
        props.handleChange({
            target: {
                name: props.name,
                value: selected
            }
        })
    }, [selected])

    const optionsJsx = options?.map(opt => (
        <li className={opt.checked === true ? "checked select-item" : "select-item"} onClick={e => toggle(opt.value)}>
            <span><AiOutlineCheck /></span>
            <p className="select-label">{opt.label}</p>
        </li>
    ))

    const showOptions = e => {
        for (const s of document.querySelectorAll(".form-parent > form > .select"))
            s.childNodes[2].classList.add("hidden")

        e.target.parentNode.childNodes[2].classList.remove("hidden")
    }



    return (
        <span className="form-component select multiple">
            <label>{props.label}</label>
            <input
                value={display}
                className="select-serach"
                placeholder="Select Items "
                onClick={e => showOptions(e)}
            />
            <span className="select-options hidden">
                <input
                    value={searchFilter}
                    className="select-serach"
                    placeholder="Search . . . "
                    onChange={e => setSearchFilter(e.target.value)}
                />
                <ul>
                    {optionsJsx}
                </ul>
            </span>
        </span>
    )
}

export default MultipleSelect