import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export default function LoginForm(props) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

   useEffect(()=>{
    if(props.authenticated){
        navigate('/')
      }
   },[props.authenticated])

    function handleSubmit(e){
    e.preventDefault();
    const userData = {username,password}
    props.login(userData)
    };
    const errorsShow = ( //props.errors.length === 0 ? null : 
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

            <input type='password' 
            value={password} 
            onChange={e => {e.preventDefault(); setPassword(e.target.value)}}
            placeholder='Password'
            />
            <br/>
            <input type='submit' value='Submit'/>

        </div>
        {/* show errors */}
        <ul>
          {errorsShow}
        </ul>
    </form>
  )
}
