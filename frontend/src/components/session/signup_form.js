import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupForm(props) {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
         if(props.isSignIn){
                navigate('/login')
            }
    },[props.isSignIn])
    
    function handleSubmit(e){
        e.preventDefault();
        const userData = {username,email,password,password2}
        props.signup(userData)
    }

    const errorsShow = (
      Object.values(props.errors).map((el,idx) =>(
        <li key={idx}>
          {el}
        </li>
      ))
    )
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input type='text' 
            value={username} 
            onChange={e => {e.preventDefault(); setUsername(e.target.value)}}
            placeholder='Username'
            />
            <br/>

            <input type='text' 
            value={email} 
            onChange={e => {e.preventDefault(); setEmail(e.target.value)}}
            placeholder='Email'
            />
            <br/>

            <input type='password' 
            value={password} 
            onChange={e => {e.preventDefault(); setPassword(e.target.value)}}
            placeholder='Password'
            />
            <br/>

            <input type='password' 
            value={password2} 
            onChange={e => {e.preventDefault(); setPassword2(e.target.value)}}
            placeholder='Repeat your password'
            />
            <br/>
            <input type='submit' value='Signup'/>
        </div>
        <ul>
          {errorsShow}
        </ul>
    </form>
  )
}
