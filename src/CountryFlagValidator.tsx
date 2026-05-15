import React, { useEffect, useMemo } from 'react';

interface CountryFlagValidatorProps {
    password: string;
    onValidationChange: (isValid: boolean, countryCode: string) => void;
}

const countries = [
    "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"
];

const CountryFlagValidator: React.FC<CountryFlagValidatorProps> = ({ password, onValidationChange }) => {
    const selectedCountry = useMemo(() => {
        return countries[Math.floor(Math.random() * countries.length)];
    }, []);

    const isValid = password.toLowerCase().includes(selectedCountry.toLowerCase());

    useEffect(() => {
        onValidationChange(isValid, selectedCountry);
    }, [isValid, selectedCountry, onValidationChange]);

    return (
        <div className={`country-validator-card ${isValid ? 'valid' : 'invalid'}`}>
            <p className="validator-label">Tato země musí být v hesle:</p>
            <div className="flag-wrapper">
                <img
                    src={`https://flagsapi.com/${selectedCountry}/flat/64.png`}
                    alt={`Vlajka státu ${selectedCountry}`}
                />
            </div>
            {!isValid && (
                <p className="error-hint">
                    Zkratka <strong>{selectedCountry}</strong> chybí!
                </p>
            )}
            {isValid && <p className="success-hint">Země nalezena! ✅</p>}

            <style>{`
                .country-validator-card {
                    margin: 1rem 0;
                    padding: 1rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    background: var(--card-bg, #ffffff);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .country-validator-card.invalid {
                    border-color: #e74c3c;
                }
                .country-validator-card.valid {
                    border-color: #2ecc71;
                    opacity: 0.8;
                }
                .validator-label {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: var(--text-color, #1e293b);
                }
                .flag-wrapper img {
                    display: inline-block;
                    background: #f1f5f9;
                    padding: 5px;
                    border-radius: 8px;
                }
                .error-hint {
                    color: #e74c3c;
                    font-size: 0.85rem;
                    margin-top: 8px;
                    animation: pulse 1.5s infinite;
                }
                .success-hint {
                    color: #2ecc71;
                    font-size: 0.85rem;
                    margin-top: 8px;
                }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default CountryFlagValidator;