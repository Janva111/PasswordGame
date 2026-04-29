import React, { useEffect} from 'react';

interface TimeResult {
    isHuman: boolean;
    secondsTaken: number;
}

interface Props {
    password: string;
    startTime: number;
    onValidation: (result: TimeResult) => void;
}

const PasswordTimeValidator: React.FC<Props> = ({ password, startTime, onValidation }) => {
    useEffect(() => {
        if (password.length > 0) {
            const now = Date.now();
            const diff = (now - startTime) / 1000;

            onValidation({
                isHuman: diff > 2,
                secondsTaken: Math.round(diff)
            });
        }
    }, [password, startTime, onValidation]);

    return null;
};

export default PasswordTimeValidator;