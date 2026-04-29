import React, { useEffect } from 'react';

interface SequenceResult {
    isValid: boolean;
    count: number;
}

interface Props {
    password: string;
    onValidation: (result: SequenceResult) => void;
}

const CharacterSequenceValidator: React.FC<Props> = ({ password, onValidation }) => {
    useEffect(() => {
        const checkSequence = () => {
            let validSequences = 0;

            for (let i = 0; i <= password.length - 4; i++) {
                const chunk = password.slice(i, i + 4);
                const hasLower = /[a-z]/.test(chunk);
                const hasUpper = /[A-Z]/.test(chunk);
                const hasNumber = /[0-9]/.test(chunk);
                const hasSpecial = /[!@#$%^&*]/.test(chunk);

                if (hasLower && hasUpper && hasNumber && hasSpecial) {
                    validSequences++;
                }
            }

            onValidation({
                isValid: validSequences > 0,
                count: validSequences
            });
        };

        checkSequence();
    }, [password, onValidation]);

    return null;
};

export default CharacterSequenceValidator;