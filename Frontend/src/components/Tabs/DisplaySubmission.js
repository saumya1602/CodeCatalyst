import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import CodeEditor from '../CodeEditor/CodeEditor';

function DisplaySubmission({ submissions = null }) {

    if (!submissions) return (<h1>Loading...</h1>);

    return (
        <Tab.Container id="submissions-tab" defaultActiveKey={0}>
            <Nav variant="tabs" style={{ borderBottom: '2px solid #1e88e5' }}>
                {submissions.map((submission, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link
                            eventKey={index}
                            style={{
                                color: '#1e88e5', // Bright blue text for active tab
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            }}
                        >
                            {submission.Question.QuestionName}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <Tab.Content>
                {submissions.map((submission, index) => (
                    <Tab.Pane key={index} eventKey={index}>
                        <div 
                            className="alert alert-primary text-center my-3" 
                            role="alert"
                            style={{
                                background: 'linear-gradient(90deg, #1e88e5, #43a047)', // Vibrant gradient for score section
                                color: '#fff',
                                borderRadius: '10px',
                            }}
                        >
                            <p>Score : {submission.ScoreObtained} / {submission.TotalScore}</p>
                        </div>
                        <CodeEditor defaultCode={submission.SubmittedCode} isEditable={false} />
                    </Tab.Pane>
                ))}
            </Tab.Content>
        </Tab.Container>
    );
}

export default DisplaySubmission;
