import React, { useState , useEffect} from 'react'
import style from './SignupForm.module.css'

const SignupForm = (props) => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [telNumber,setTelNumber] = useState('')
    const [studentId,setStudentId] = useState(null)
    const [uniName,setUniName] = useState(null)
    const [error, setError] = useState(null)
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
    const handleTelNumber = (e) => {
        // e.persist()
        const tel = e.target.value 
        if(tel.length !== 11 || isNaN(tel)){
            setError('شماره تلفن معتبر وارد کنید')
        }else{
            setError(null)
        }
        setTelNumber(tel)
    }
    const handleStudentId = (e) => {
        e.persist()
        const id = e.target.value
        if(id.length !== 9 || isNaN(id)){
            setError('شماره دانشجویی معتبر وارد کنید')
        }else{
            setError(null)
        }
        setStudentId(id)
    }
    const handleUniName = (e) => {
        e.persist()
        const uni = e.target.value 
        setUniName(uni)
    }
    
    const onFormSubmit = (e) => {
        e.preventDefault()
        alert(`${username} Done`)
    }

    return (
        <div>
            <form className={style.signupForm} onSubmit={onFormSubmit}>
                {error && <p className={style.error}>{error}</p>}
                <label>نام کاربری 
                <input
                type="text"
                 value={username} 
                 onChange={handleUsernameChange}/>
                 </label>
                <label>رمز عبور 
                <input
                type="password"
                value={password}
                onChange={handlePasswordChange}/>
                </label>
                <label>شماره تلفن 
                <input
                value={telNumber}
                onChange={handleTelNumber}/>
                </label>
                <label>شماره دانشجویی 
                <input
                value={studentId}
                onChange={handleStudentId}/>
                </label>
                <label>نام دانشگاه 
                <input
                value={uniName}
                onChange={handleUniName}/>
                </label>
                <button type="submit">ثبت</button>                
            </form>
        </div>
    )
}

export default SignupForm