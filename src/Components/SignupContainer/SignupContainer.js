import React , {useState, useEffect} from 'react'
import InitialSignup from '../InitialSignup/InitialSignup'
import SignupForm from '../SignupForm/SignupForm' 

const SignupContainer = (props) => {
    const [isFirstSignupDone, setIsFirstSignupDone] = useState(false)
    const initialSubmit = () => {
        setIsFirstSignupDone(true)
        console.log('first')
    }
    let form = isFirstSignupDone ? 
        <SignupForm/> : 
        <InitialSignup submitted={initialSubmit} />
    return (
        form
    )
}

export default SignupContainer