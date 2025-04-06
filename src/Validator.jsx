import React, { useState } from 'react';
import validator from 'validator';
import './Validator.css';

const Validator = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = (value) => {
        setPassword(value);
        const options = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        };

        const strengthCheck = [
            /[a-z]/.test(value),  // Lowercase
            /[A-Z]/.test(value),  // Uppercase
            /\d/.test(value),     // Number
            /[!@#$%^&*]/.test(value),  // Symbol
            value.length >= options.minLength
        ].filter(Boolean).length;

        setStrength(strengthCheck);

        if (validator.isStrongPassword(value, options)) {
            setErrorMessage('Your Password is Strong 💪');
        } else {
            setErrorMessage('Password is Weak 😟');
        }
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.body.classList.toggle('dark-theme');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`validator-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkTheme ? '🌞' : '🌙'}
            </button>
            
            <div className="validator-card">
                <h1 className="title">Password Strength Checker</h1>
                
                <div className="password-input-group">
                    <div className="password-input-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => validate(e.target.value)}
                            placeholder="Enter your password"
                            className="password-input"
                        />
                        <button 
                            type="button" 
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? '👁️' : '🗨️'}
                        </button>
                    </div>
                    <div className="strength-meter">
                        {[...Array(5)].map((_, index) => (
                            <div 
                                key={index}
                                className={`strength-bar ${index < strength ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className={`feedback-message ${strength >= 4 ? 'strong' : 'weak'}`}>
                    {errorMessage}
                </div>

                <div className="requirements-list">
                    <h3>Password Requirements:</h3>
                    <ul>
                        <li className={password.length >= 8 ? 'met' : ''}>At least 8 characters</li>
                        <li className={/\d/.test(password) ? 'met' : ''}>At least 1 number</li>
                        <li className={/[A-Z]/.test(password) ? 'met' : ''}>At least 1 uppercase letter</li>
                        <li className={/[a-z]/.test(password) ? 'met' : ''}>At least 1 lowercase letter</li>
                        <li className={/[!@#$%^&*]/.test(password) ? 'met' : ''}>At least 1 special character</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Validator;
