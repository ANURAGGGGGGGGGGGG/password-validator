import React, { useState } from 'react'
import validator from 'validator'
const Validator = () => {
    const [errorMessage, setErrorMessage] = useState(' ')
    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('Your Password is Strong')
        } else {
            setErrorMessage('Is not strong Password')
        }
    }
    return (
        <>
            <div>
                <h2>Checking Password Strength in React JS</h2>
                <label htmlFor=""> Enter Password</label>
                <input type="text" onChange={(e) => validate(e.target.value)} />
                {
                    errorMessage === "" ? null :
                        <div style={{ color: 'red' }}>{errorMessage}</div>
                }
            </div>
        </>
    )
}

export default Validator
