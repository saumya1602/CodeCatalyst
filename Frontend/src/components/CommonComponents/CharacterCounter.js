import { useState, useEffect } from 'react';

function CharacterCounter({ maxLength, textAreaRef, fontColor = '#333' }) {
    const [remainingChars, setRemainingChars] = useState(maxLength);

    useEffect(() => {
        const handleInput = () => {
            const inputText = textAreaRef.current.value;
            setRemainingChars(maxLength - inputText.length);
        };

        textAreaRef.current.addEventListener('input', handleInput);

    }, [maxLength, textAreaRef]);

    return (
        <div style={{ textAlign: 'center' }}>
            {remainingChars >= 0 ? (
                <p
                    style={{
                        color: fontColor,
                        fontSize: '1rem',
                        fontWeight: '500',
                    }}
                >
                    {remainingChars} characters remaining
                </p>
            ) : (
                <p
                    style={{
                        color: 'red',
                        fontSize: '1rem',
                        fontWeight: '500',
                    }}
                >
                    {Math.abs(remainingChars)} characters over limit
                </p>
            )}
        </div>
    );
}

export default CharacterCounter;
