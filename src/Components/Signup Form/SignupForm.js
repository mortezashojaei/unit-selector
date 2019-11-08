import React, { useState , useEffect} from 'react'
import axios from 'axios'
import style from './SignupForm.module.css'

const SignupForm = (props) => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [majors,setMajors] = useState([])
    const [major, setMajor] = useState()
    const [semester,setSemester] = useState()
    const [fullName, setFullName] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3000/majors').then(response => {
            setMajors(response.data)
        }).catch(err => console.log(err))
    },[])

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
    const handleSemesterChange = (e) => {
        e.persist()
        const term = e.target.value
        if(term < 0 || term > 12){
            setError('شماره ترم را اصلاح کنید')
        }else{
            setError(null)
        }
        setSemester(term)
    }
    const handleFullNameChange = (e) => {
        const name = e.target.value 
        setFullName(name)
    }
    const handleMajorChange = (e) => {
        const major = e.target.value
        setMajor(major)
    }
    
    const onFormSubmit = (e) => {
        e.preventDefault()
        if(!error){
            axios.post('http://localhost:3000/users',{
                username,
                password,
                semester,
                major,
                full_name: fullName
            }).then(() => {
                console.log('done')
                alert('done')
            }).catch(err => console.log(err))
        }else{
            alert('error')
        }
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
                <label>ترم
                <input
                type="number"
                value={semester}
                onChange={handleSemesterChange}
                />
                </label>
                <label>رشته
                <select onChange={handleMajorChange}>
                    {majors.map(major => <option value={major.id}>{major.name}</option>)}
                </select>
                </label>
                <label>نام و نام خانوادگی
                <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                />
                </label>
                <button type="submit">ثبت</button>                
            </form>
        </div>
    )
}

export default SignupForm