import { useState, useCallback, useMemo } from 'react';
import validator from 'validator';
import './Validator.css';

const PASSWORD_OPTIONS = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const SPECIAL_CHARS = /[!@#$%^&*]/;
const REQUIREMENTS = [
  { test: (p) => p.length >= 8, label: 'At least 8 characters' },
  { test: (p) => /\d/.test(p), label: 'At least 1 number' },
  { test: (p) => /[A-Z]/.test(p), label: 'At least 1 uppercase letter' },
  { test: (p) => /[a-z]/.test(p), label: 'At least 1 lowercase letter' },
  { test: (p) => SPECIAL_CHARS.test(p), label: 'At least 1 special character' },
];

function getStrengthLevel(score) {
  if (score <= 2) return 'weak';
  if (score <= 3) return 'fair';
  if (score === 4) return 'good';
  return 'strong';
}

function getStrengthLabel(level) {
  switch (level) {
    case 'weak': return 'Weak';
    case 'fair': return 'Fair';
    case 'good': return 'Good';
    case 'strong': return 'Strong';
    default: return '';
  }
}

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 2.5L3.5 7.5L1.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircleIcon = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="3" r="3" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Validator = () => {
  const [password, setPassword] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => {
    if (!password) return 0;
    return [
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      SPECIAL_CHARS.test(password),
      password.length >= 8,
    ].filter(Boolean).length;
  }, [password]);

  const isStrong = useMemo(
    () => validator.isStrongPassword(password, PASSWORD_OPTIONS),
    [password]
  );

  const strengthLevel = useMemo(() => {
    if (!password) return '';
    return getStrengthLevel(strength);
  }, [password, strength]);

  const feedback = useMemo(() => {
    if (!password) return { text: '', level: '' };
    if (isStrong) return { text: 'Your password is strong', level: 'strong' };
    return { text: 'Your password is weak', level: strengthLevel };
  }, [password, isStrong, strengthLevel]);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
    document.body.classList.toggle('dark-theme');
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className={`validator-container ${isDarkTheme ? 'dark' : 'light'}`}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDarkTheme ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="validator-card">
        <h1 className="title">Password Strength Checker</h1>
        <p className="subtitle">Enter a password to check its strength</p>

        <div className="password-input-group">
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="password-input"
              aria-label="Password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <div className="strength-meter" role="meter" aria-label="Password strength" aria-valuenow={strength} aria-valuemin={0} aria-valuemax={5}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`strength-bar ${index < strength ? strengthLevel : ''}`}
              />
            ))}
          </div>

          {password && (
            <div className="strength-label">
              <span className={`strength-label-text ${strengthLevel}`}>
                {getStrengthLabel(strengthLevel)}
              </span>
            </div>
          )}
        </div>

        {feedback.text && (
          <div className={`feedback-message ${feedback.level}`}>
            {feedback.text}
          </div>
        )}

        <div className="requirements-list">
          <h3>Requirements</h3>
          <ul>
            {REQUIREMENTS.map((req) => {
              const met = req.test(password);
              return (
                <li key={req.label} className={met ? 'met' : ''}>
                  <span className="req-icon">
                    {met ? <CheckIcon /> : <CircleIcon />}
                  </span>
                  {req.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Validator;
