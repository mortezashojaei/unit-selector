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
            const data={
                username , password
            };
            userinstance.post('/login/',data)
              .then(function (response) {
                if(response.data.StatusCode==200)
                    setError(Dialogues.loginokerr)    
              })
              .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    if(error.response.status==403){
                        setError(Dialogues.loginfielderr)
                    }
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    //console.log(error.request);
                    setError(Dialogues.haveproblemerr);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    setError(Dialogues.haveproblemerr);
                  }
                
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