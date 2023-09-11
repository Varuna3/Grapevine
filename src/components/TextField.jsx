// Text Field: A field where the user can input text.

import { useId } from 'react'

import '../styles/text-field.scss'

export default function TextField(props) {
    // Destructure component props:
    const {
        type = 'text',
        placeholder = '',
        label = 'Enter Information:',
        value,
        callback,
        required,
    } = props

    // Create a unique ID for the input field:
    const inputId = useId()

    // Update onChange callback with value:
    function handleChange(event) {
        callback(event.target.value)
    }

    return (
        <div className="text-field">
            <label className="text-field-label" htmlFor={inputId}>
                {label}
            </label>
            <input
                className="text-field-input"
                id={inputId}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required={required}
            />
        </div>
    )
}
