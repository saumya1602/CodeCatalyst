import React from 'react';

function VerdictBadge({ verdict }) {
    const verdictMap = {
        'Accepted': { variant: 'success', text: 'AC' },
        'Wrong Answer': { variant: 'danger', text: 'WA' },
        'Time Limit Exceeded': { variant: 'warning', text: 'TLE' },
        'Runtime Error': { variant: 'danger', text: 'RE' },
        'Compilation Error': { variant: 'danger', text: 'CE' },
        'Memory Limit Exceeded': { variant: 'warning', text: 'MLE' },
    };

    const { variant = 'secondary', text = verdict } = verdictMap[verdict] || {};

    return (
        <span
            className={`badge bg-${variant}`}
            style={{
                fontSize: '17px',
                color: '#fff',
                background: variant === 'success' 
                    ? 'linear-gradient(90deg, #1e88e5, #43a047)' // Vibrant gradient for success
                    : variant === 'danger'
                    ? 'linear-gradient(90deg, #d32f2f, #e57373)' // Red gradient for errors
                    : variant === 'warning'
                    ? 'linear-gradient(90deg, #ff9800, #ffb74d)' // Orange gradient for warnings
                    : 'linear-gradient(135deg, #ffffff, #f0f4f8)', // Default light gradient
                borderRadius: '30px',
                padding: '5px 20px',
                textAlign: 'center',
                boxShadow: '0px 6px 15px rgba(30, 136, 229, 0.4)',
            }}
        >
            {text}
        </span>
    );
}

export default VerdictBadge;
