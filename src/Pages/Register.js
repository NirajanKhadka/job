import React, { useState,useEffect } from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import { FormRow, Logo } from '../components'
import {toast} from 'react-toastify'

function Register() {

  const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:''
  }

  const [values,setValues] = useState(initialState)

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("submitted")
    const {name,email,password,isMember} = values;
    if ((isMember && !name) || !email || !password){ toast.error("please fill out all the fields") }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({...values,[name]:value})
  }

  const toggleMember = (e) => {
    setValues({...values,isMember:!values.isMember})
  }

  
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember?'Login':'Register'}</h3>
        
        {values.isMember && <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}
        <FormRow type='email' name='email'  value={values.email} handleChange={handleChange} />
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
        
        <button type='submit' className='btn btn-block'>Submit</button>

        <p>
          {values.isMember?'Not a member?':'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>{values.isMember?'Register':'Login'}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register