import React from 'react'

function FormRow({name,type,value,handleChange,labelText}) {
return (
    <div className="form-row">
        <label htmlFor={name} className='form-label'>{name}</label>
        <input type={type} value={value} onChange={handleChange} className='form-input'/>
    </div>
)
}

export default FormRow