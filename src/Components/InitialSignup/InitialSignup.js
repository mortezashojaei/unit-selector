import React, { useState } from 'react'
import { Dialogues } from '../../Utils/Dialogues'
import styles from './InitialSignup.module.scss'

const InitialSignup = (props) => {
    const [userName, setUserName] = useState()
    const [isEmpty, setIsEmpty] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const onUserNameChange = (e) => {
        setUserName(e.target.value)
    }
    const onSubmit = e => {
        e.preventDefault()
        if(userName && userName.trim().length > 0) {
            setIsEmpty(false)
            setIsWrong(false)
            props.submitted()
        }else if(!userName || (userName && !userName.trim().length > 0)){
            setIsEmpty(true)
        }
    }
    return (
        <div className={styles.initialSignupForm}>
        <form onSubmit={onSubmit} >
            <div>
            <label>
                {userName && <span>{Dialogues.emailPlaceholder}</span>}
                <input
                className={`${(isEmpty || isWrong) && styles.error}`}
                value={userName}
                onChange={onUserNameChange}
                placeholder={Dialogues.emailPlaceholder}
                type='text'
                />
                {isEmpty ? (
                    <p>{`${Dialogues.emailPlaceholder} نمیتواند خالی باشد`}</p>
                 ) : (
                     isWrong && (<p>'کاربر با این ایمیل موجود است'</p>)
                 )}
            </label>
            </div>
            <button>{Dialogues.signup}</button>
            
        </form>
        </div>
    )
}

export default InitialSignup