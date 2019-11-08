import React, { useState , useEffect} from 'react'
import style from './style.scss'
import API from '../../Utils/API'
import {Dialogues} from '../../Utils/Dialogues'
const {userinstance}=API;
const LoginForm = (props) => {
    const [username, setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('');
    const handleSubmit = (e) => {
        e.persist()
        e.preventDefault();
        if(!username || !password ){
            setError(Dialogues.inputemptyerr)
        }
        else{
            const req={username , password};
            userinstance.post('/login',req)
              .then(function (response) {
                console.log(response);
                if(response.body.StatusCode==200)
                    setError(Dialogues.loginokerr)
                else
                    setError(Dialogues.loginfielderr)
              })
              .catch(function (error) {
                setError(Dialogues.haveproblemerr);
              });
        }
    }

        return (
       <form>
           <input id="usernme" value={username} placeholder={Dialogues.usernameplc} onChange={(e)=>{setUsername(e.target.value)}}></input>
           <input id="password" value={password} placeholder={Dialogues.passwordplc} onChange={(e)=>{setPassword(e.target.value)}}></input>
           <button type="submit" onClick={handleSubmit}>{Dialogues.submitbtn}</button>
           <p>{error}</p>
       </form>
        );

  }
  export default LoginForm