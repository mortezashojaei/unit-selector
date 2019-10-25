import React, { useState , useEffect} from 'react'
import style from './SignupForm.module.css'

const SignupForm = (props) => {
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const handleUsernameChange = (e) => {
        e.persist()
        const username = e.target.value
        if(username.length < 5 ){
            setError('لطفا بیشتر از 5 کاراکتر وارد کنید')
        }else{
            setError(null)
        }
            setUsername(username)
    }
    return (
        <div>
            <form className={style.signupForm}>
                {error && <p>{error}</p>}
                <label>نام کاربری <input value={username} onChange={handleUsernameChange} /></label>
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