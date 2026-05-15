    import React, { useState, useEffect, useCallback} from 'react';
    import PasswordStrength from './PasswordStrength';
    import CountryFlagValidator from './CountryFlagValidator';
    import './PasswordGame.css';

    interface SequenceResult {
        isValid: boolean;
        count: number;
    }

    interface TimeResult {
        isHuman: boolean;
        secondsTaken: number;
    }

    interface Props {
        password: string;
        setPassword: React.Dispatch<React.SetStateAction<string>>;
        sequenceData: SequenceResult;
        timeData: TimeResult;
        selectedCountry: string
    }

    const PasswordGame: React.FC<Props> = ({ password, sequenceData, timeData }) =>
    {
        const [progress, setPasswordStrength] = useState(0);
        const [isCountryValid, setIsCountryValid] = useState(false);
        const [selectedCountry, setSelectedCountry] = useState("");

        const handleCountryValidation = useCallback((isValid: boolean, countryCode: string) => {
            setIsCountryValid(isValid);
            setSelectedCountry(countryCode);
        }, []);

        useEffect(() => {
            const rules = [
                { id: 1, check: () => password.length >= 8 },
                { id: 2, check: () => /[0-9]/.test(password) },
                { id: 3, check: () => /[A-Z]/.test(password) },
                { id: 4, check: () => /[!@#$%^&*]/.test(password) },
                {
                    id: 5,
                    check: () => {
                        const digits = password.match(/\d/g);
                        const sum = digits ? digits.reduce((a, b) => a + parseInt(b), 0) : 0;
                        return sum === 25;
                    }
                },
                { id: 6, check: () => sequenceData.isValid },
                { id: 7, check: () => timeData.isHuman },
                { id: 8, check: () => isCountryValid }
            ];

            const firstUnmetIndex = rules.findIndex(r => !r.check());
            const unlockedMetCount = firstUnmetIndex === -1 ? rules.length : firstUnmetIndex;
            setPasswordStrength(Math.round((unlockedMetCount / rules.length) * 100));
        }, [password, sequenceData, timeData, isCountryValid]);

        return (
            <div className="password-game-wrapper max-w-2xl mx-auto p-4">
                <div className="progress-container mb-6">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-500"
                            style={{ width: `${progress}%`, backgroundColor: progress < 100 ? '#facc15' : '#22c55e' }}
                        />
                    </div>
                </div>

                <CountryFlagValidator
                    password={password}
                    onValidationChange={handleCountryValidation}
                />

                <PasswordStrength
                    password={password}
                    sequenceData={sequenceData}
                    timeData={timeData}
                    selectedCountry={selectedCountry}
                    isCountryValid={isCountryValid}
                />
            </div>
        );
    };

    export default PasswordGame;