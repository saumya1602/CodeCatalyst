import React from 'react';

function LandingPageCard({ title, content, btntext, btnlink }) {
    return (
        <div
            className="card"
            style={{
                background: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background for glass effect
                borderRadius: '20px', // Smooth corners
                backdropFilter: 'blur(10px)', // Glass blur effect
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Depth
                border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border for contrast
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                overflow: 'hidden',
                cursor: 'pointer', // Makes the card feel interactive
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'; // Lift on hover
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'; // Return to normal
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
        >
            <div className="card-body text-center" style={{ padding: '25px' }}>
                {/* Title */}
                <h5
                    className="card-title fw-bold"
                    style={{
                        fontSize: '1.8rem',
                        color: '#333', // Dark text for readability
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                    }}
                >
                    {title}
                </h5>
                
                {/* Content */}
                <p
                    className="card-text"
                    style={{
                        fontSize: '1rem',
                        color: '#555', // Subtle gray for the text
                        marginBottom: '20px',
                        lineHeight: '1.6',
                    }}
                >
                    {content}
                </p>
                
                {/* Button */}
                <a
                    href={btnlink}
                    className="btn"
                    style={{
                        background: 'linear-gradient(90deg, #1e88e5, #43a047)', // Gradient to match LandingPage
                        color: '#fff', // White text for contrast
                        padding: '10px 30px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        boxShadow: '0 6px 15px rgba(30, 136, 229, 0.3)',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.boxShadow = '0 8px 20px rgba(30, 136, 229, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 6px 15px rgba(30, 136, 229, 0.3)';
                    }}
                >
                    {btntext}
                </a>
            </div>
        </div>
    );
}

export default LandingPageCard;
