import React from 'react'

function FormRow({name,type,value,handleChange,labelText}) {
return (
    <div className="form-row">
        <label htmlFor={name} className='form-label'>{name}</label>
        <input type={type} name ={name} value={value} onChange={handleChange} id={name} className='form-input'/>
    </div>
)
}

export default FormRow