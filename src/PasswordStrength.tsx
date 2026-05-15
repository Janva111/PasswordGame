import React, {useCallback, useState} from 'react';
import './PasswordStrength.css';


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
    isCountryValid: boolean;

}

const PasswordStrength: React.FC<Props> = ({
                                               password, sequenceData, timeData, selectedCountry, isCountryValid
                                           }) => {

    const [selectedCountry, setSelectedCountry] = useState("");

    const handleCountryValidation = useCallback((isValid: boolean, countryCode: string) => {
        i
        setSelectedCountry(countryCode);
    }, []);

    const rules = [
        {id: 1, label: "Heslo musí mít aspoň 8 znaků.", check: (p: string) => p.length >= 8},
        {id: 2, label: "Heslo musí obsahovat číslo.", check: (p: string) => /[0-9]/.test(p)},
        {id: 3, label: "Heslo musí obsahovat velké písmeno.", check: (p: string) => /[A-Z]/.test(p)},
        {id: 4, label: "Heslo musí obsahovat speciální znak.", check: (p: string) => /[!@#$%^&*]/.test(p)},
        {
            id: 5, label: "Číslice v hesle musí mít součet 25.", check: (p: string) => {
                const digits = p.match(/\d/g);
                const sum = digits ? digits.reduce((a, b) => a + parseInt(b), 0) : 0;
                return sum === 25;
            }
        },
        {id: 6, label: `Musí obsahovat kombo (aA1!) za sebou.`, check: () => sequenceData.isValid},
        {id: 7, label: `Psaní musí trvat aspoň 5s. (Čas: ${timeData.secondsTaken}s)`, check: () => timeData.isHuman},
        {id: 8, label: `Heslo musí obsahovat zkratku teto země:`, check: () => isCountryValid, isCountryRule: true},
    ];

    const firstUnmetIndex = rules.findIndex(rule => !rule.check(password));
    const visibleRules = rules.slice(0, firstUnmetIndex === -1 ? rules.length : firstUnmetIndex + 1);

    return (
        <div className="game-container">
            <div className="status-bar">
                {firstUnmetIndex === -1 ? (
                    <h2 className="win">HESLO JE PŘIJATO! 🎉</h2>
                ) : (
                    <h2>Požadavky:</h2>
                )}
            </div>

            <div className="rules-stack">
                {[...visibleRules].reverse().map((rule) => {
                    const isMet = rule.check(password);
                    return (
                        <div
                            key={rule.id}
                            className={`rule-card ${isMet ? 'met' : 'unmet'}`}
                        >
                            <div className="rule-header">
                                <span>{isMet ? '✅' : '❌'}</span>
                                <span>Úkol {rule.id}</span>
                            </div>
                            <p className='rule-text'>{rule.label}</p>

                            {rule.isCountryRule && (
                                <div style={{marginTop: '10px', textAlign: 'center'}}>
                                    <img
                                        src={`https://flagsapi.com/${selectedCountry}/flat/64.png`}
                                        alt="Vlajka"
                                        style={{background: 'white', padding: '4px', borderRadius: '4px'}}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PasswordStrength;