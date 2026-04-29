import React, { useState } from 'react';
interface Props {
    password: string;
    setPassword: (value: string) => void;
}
import './PasswordInput.css'

const PasswordInput: React.FC<Props> = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="input-group group">
            <label
                htmlFor="password-field"
                className="transition-colors duration-300"
            >
                Zadejte heslo:
            </label>
            <div className="password-wrapper shadow-md hover:shadow-lg transition-shadow duration-300">
                <input
                    id="password-field"
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Začni psát heslo podle pravidel"
                    className="placeholder:transition-opacity focus:placeholder:opacity-50"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-btn hover:tracking-widest"
                >
                    {showPassword ? 'Skrýt' : 'Zobrazit'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;