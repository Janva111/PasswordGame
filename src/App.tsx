import React, { useState, useCallback } from 'react';
import PasswordInput from './PasswordInput.tsx';
import PasswordGame from './PasswordGame.tsx'; // Importujeme novou herní komponentu
import CharacterSequenceValidator from './CharacterSequenceValidator.tsx';
import PasswordTimeValidator from './PasswordTimeValidator.tsx';
import './App.css';

interface SequenceResult {
    isValid: boolean;
    count: number;
}

interface TimeResult {
    isHuman: boolean;
    secondsTaken: number;
}

const App: React.FC = () => {
    const [password, setPassword] = useState('');
    const [startTime] = useState(() => Date.now());

    const [sequenceData, setSequenceData] = useState<SequenceResult>({ isValid: false, count: 0 });
    const [timeData, setTimeData] = useState<TimeResult>({ isHuman: true, secondsTaken: 0 });

    const handleSequence = useCallback((data: SequenceResult) => setSequenceData(data), []);
    const handleTime = useCallback((data: TimeResult) => setTimeData(data), []);

    return (
        <div className="app-container">
            <h1>The Password Game</h1>

            <PasswordInput password={password} setPassword={setPassword} />

            <CharacterSequenceValidator password={password} onValidation={handleSequence} />
            <PasswordTimeValidator password={password} startTime={startTime} onValidation={handleTime} />

            <PasswordGame
                password={password}
                sequenceData={sequenceData}
                timeData={timeData}
            />

            <div className="stats-footer">
                Nalezeno sekvencí: {sequenceData.count} | Čas psaní: {timeData.secondsTaken}s
            </div>
        </div>
    );
}

export default App;