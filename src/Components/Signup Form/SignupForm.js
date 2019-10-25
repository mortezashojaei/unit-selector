import React, { useState , useEffect} from 'react'
import style from './SignupForm.module.css'

const SignupForm = (props) => {
    
    return (
        <div>
            <form className={style.signupForm}>
                <label>نام کاربری <input/></label>
                <label>رمز عبور <input/></label>
                <label>شماره تلفن <input/></label>
                <label>شماره دانشجویی <input/></label>
                <label>نام دانشگاه <input/></label>
                <button>ثبت</button>                
            </form>
        </div>
    )
}

export default SignupForm