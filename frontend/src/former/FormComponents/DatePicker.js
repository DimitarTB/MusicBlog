import React from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css"
import DatePicker from "react-modern-calendar-datepicker"

const Picker = props => {

    let value = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    }

    if (props.value instanceof Date) {
        value = {
            year: props.value?.getFullYear(),
            month: props.value?.getMonth() + 1,
            day: props.value?.getDate(),
        }
    }


    const handleChange = e => {
        props.handleChange({
            target: {
                name: props.name,
                value: new Date(e.year + "-" + e.month + "-" + e.day + " 00:00:00")
            }
        })
    }

    return (
        <span className="form-component date-picker">
            <label>{props.label}</label>
            <DatePicker
                value={value}
                onChange={e => handleChange(e)}
                inputPlaceholder="Select a date"
                shouldHighlightWeekends
            />
        </span>
    )
}

export default Picker