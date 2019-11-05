import React, { useState , useEffect} from 'react'
import style from './style.scss'


const LoginForm = (props) => {
    const [username, setUsername]=useState(null)
    const [password,setPassword]=useState(null)
    const [error,setError]=useState(null);
    const handlePasswordChange = (e) => {
        e.persist()
        const password = e.target.value 
        if(password.length < 4){
            setError('برای رمز عبور بیشتر از 4 کاراکتر وارد کنید')
        }else{
            setError(null)
        }
        setPassword(password)
    }
    const handleUsernameChange = (e) => {
        e.persist()
        const username = e.target.value
        if(username.length < 5 ){
            setError(' برای نام کاربری بیشتر از 5 کاراکتر وارد کنید')
        }else{
            setError(null)
        }
            setUsername(username)
    }

        return (
       <form>
           <input id="usernme" value={username} placeholder="input username..." onChange={(e)=>{setUsername(e.target.value)}}></input>
           <input id="password" value={password} placeholder="input password..." onChange={(e)=>{setPassword(e.target.value)}}></input>
           <button type="submit">submit</button>
       </form>
        );

  }
  export default LoginForm