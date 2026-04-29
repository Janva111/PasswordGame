import React, { useState, useEffect } from 'react';
import PasswordStrength from './PasswordStrength';
import './PasswordGame.css'; // Importujeme tvůj nový styl

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
    sequenceData: SequenceResult;
    timeData: TimeResult;
}

const PasswordGame: React.FC<Props> = ({ password, sequenceData, timeData }) => {
    const [progress, setPasswordStrength] = useState(0);

    const getRules = (p: string, seq: SequenceResult, t: TimeResult) => [
        { id: 1, check: () => p.length >= 8 },
        { id: 2, check: () => /[0-9]/.test(p) },
        { id: 3, check: () => /[A-Z]/.test(p) },
        { id: 4, check: () => /[!@#$%^&*]/.test(p) },
        {
            id: 5,
            check: () => {
                const digits = p.match(/\d/g);
                const sum = digits ? digits.reduce((a, b) => a + parseInt(b), 0) : 0;
                return sum === 25;
            }
        },
        { id: 6, check: () => seq.isValid },
        { id: 7, check: () => t.isHuman }
    ];

    useEffect(() => {
        const rules = getRules(password, sequenceData, timeData);

        const firstUnmetIndex = rules.findIndex(r => !r.check());
        const unlockedMetCount = firstUnmetIndex === -1 ? rules.length : firstUnmetIndex;

        const percentage = Math.round((unlockedMetCount / rules.length) * 100);
        setPasswordStrength(percentage);
    }, [password, sequenceData, timeData]);

    const getBarColor = () => {
        if (progress < 40) return '#ff4d4d';
        if (progress < 80) return '#ffd700'
        return '#4caf50';
    };

    return (
        <div className="password-game-wrapper">
            <div className="progress-header">
                <span className="progress-label">Postup hro</span>
                <span className="progress-percentage">{progress}%</span>
            </div>

            <div className="progress-container">
                <div
                    className="progress-bar-fill"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: getBarColor()
                    }}
                />
            </div>

            <PasswordStrength
                password={password}
                sequenceData={sequenceData}
                timeData={timeData}
            />
        </div>
    );
};

export default PasswordGame;