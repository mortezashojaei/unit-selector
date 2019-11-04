import React, { useState , useEffect} from 'react'
import style from './style.scss';

const loginForm= (props)=> {

    return (
       <form>
           <input id="username" placeholder="input username..."></input>
           <input id="password" placeholder="input password..."></input>
           <button type="submit">submit</button>
       </form>
        );

  }
  export default loginForm;