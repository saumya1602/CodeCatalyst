import { useState, useEffect } from 'react';
import { countLines, countComments, cyclomaticComplexity, countIndents, countLoops, countIdentifiers } from '../../Scripts/CPPScoreCalculator.js';

function CodeScore({ Code }) {
    const [score, setScore] = useState(null);

    // called during component Mount and on every change in the Code
    useEffect(() => {
        const CalculateScore = () => {
            setScore({
                lines: countLines(Code),
                comments: countComments(Code),
                cyclometricComplexity: cyclomaticComplexity(Code),
                indents: countIndents(Code),
                loops: countLoops(Code),
                identifiers: countIdentifiers(Code)
            });
        };
        CalculateScore();
    }, [Code]);

    return (
        <div className="container py-5">
            {/* Display the score in sleek, modern palette with the new theme */}
            {score && (
                <div className="row bg-light bg-opacity-75 rounded-3" style={{ color: "#333" }}>
                    <div className="col-12 col-md-6">
                        <div className="score-card">
                            <span>Lines: {score.lines}</span>
                        </div>
                        <div className="score-card">
                            <span>Comments: {score.comments}</span>
                        </div>
                        <div className="score-card">
                            <span>Indents: {score.indents}</span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="score-card">
                            <span>Cyclometric Complexity: {score.cyclometricComplexity}</span>
                        </div>
                        <div className="score-card">
                            <span>Loops:  {score.loops}</span>
                        </div>
                        <div className="score-card">
                            <span>Identifiers: {score.identifiers}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CodeScore;
