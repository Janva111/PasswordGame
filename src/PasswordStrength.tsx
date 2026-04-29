import React from 'react';
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
    password: string,
    sequenceData: SequenceResult,
    timeData: TimeResult,
}

const PasswordStrength: React.FC<Props> = ({password, sequenceData, timeData,}) => {
    const rules = [
        {id: 1, label: "Pravidlo 1: Heslo musí mít aspoň 8 znaků.", check: (p: string) => p.length >= 8},
        {id: 2, label: "Pravidlo 2: Heslo musí obsahovat číslo.", check: (p: string) => /[0-9]/.test(p)},
        {id: 3, label: "Pravidlo 3: Heslo musí obsahovat velké písmeno.", check: (p: string) => /[A-Z]/.test(p)},
        {id: 4, label: "Pravidlo 4: Heslo musí obsahovat speciální znak.", check: (p: string) => /[!@#$%^&*]/.test(p)},
        {
            id: 5, label: "Pravidlo 5: Číslice v hesle musí mít součet 25.", check: (p: string) => {
                const digits = p.match(/\d/g);
                const sum = digits ? digits.reduce((a, b) => a + parseInt(b), 0) : 0;
                return sum === 25;
            }
        },
        {
            id: 6,
            label: `Musí obsahovat kombo (aA1!) za sebou. Nalezeno: ${sequenceData.count}`,
            check: () => sequenceData.isValid
        },
        {
            id: 7,
            label: `Nejsi robot? Psaní musí trvat aspoň 5s. (Tvůj čas: ${timeData.secondsTaken}s)`,
            check: () => timeData.isHuman
        },
    ];

    const firstUnmetIndex = rules.findIndex(rule => !rule.check(password));
    const visibleRules = rules.slice(0, firstUnmetIndex === -1 ? rules.length : firstUnmetIndex + 1);

    return (
        <div className="game-container p-4">
            <div className="status-bar">
                {firstUnmetIndex === -1 ? (
                    <h2 className="win text-3xl font-black animate-bounce">HESLO JE PŘIJATO! 🎉</h2>
                ) : (
                    <h2 className="text-xl font-bold uppercase tracking-widest opacity-70">Požadavky:</h2>
                )}
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full transition-all duration-500 ease-out"
                    style={{
                        width: `${(rules.filter(r => r.check(password)).length / rules.length) * 100}%`,
                        backgroundColor: 'var(--primary-color)'
                    }}
                ></div>
            </div>

            <div className="rules-stack">
                {[...visibleRules].reverse().map((rule) => {
                    const isMet = rule.check(password);
                    return (
                        <div
                            key={rule.id}
                            className={`rule-card shadow-lg ${isMet ? 'met' : 'unmet'}`}
                        >
                            <div className="rule-header">
                                <span>{isMet ? '✅' : '❌'}</span>
                                <span>Úkol {rule.id}</span>
                            </div>
                            <p className='rule-text'>{rule.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PasswordStrength;