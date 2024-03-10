import { useEffect } from "react";
import { Button } from 'react-bootstrap';
import QuestionDetailsPreview from '../../../components/CommonComponents/QuestionDetailsPreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
import { useState } from "react";
import { convertIsoToNormalTime, getTimeElapsed } from '../../../Scripts/TimeFunctions';
import { Accordion } from "react-bootstrap";
//Questions Array is an array of objects.
function SolveQuestion({ Questions }) {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const handleNextQuestion = () => {
        if (Questions && currentQuestionIndex < Questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(Questions[currentQuestionIndex + 1])
        }
    }

    const handlePreviousQuestion = () => {
        if (Questions && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCurrentQuestion(Questions[currentQuestionIndex - 1])
        }
    };

    useEffect(() => {
        if (Questions)
            setCurrentQuestion(Questions[0])
    }, [Questions])

    return (
        <>
            <div className="row my-3 rounded">
                <div className="col-4 text-center">
                    <Button variant="primary" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className='w-100'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center rounded" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <span style={{ color: "white" }}>Question {currentQuestionIndex + 1}</span>
                </div>
                <div className="col-4 text-center">
                    <Button variant="primary" onClick={handleNextQuestion} disabled={currentQuestionIndex === Questions?.length - 1} className='w-100'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>
            </div>
            <div className="row" style={{ color: "white" }}>
                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="text-center my-3" style={{ cursor: 'pointer' }}>
                            <h5>Question Details</h5>
                        </Accordion.Header>

                        <Accordion.Body>
                            <p className="card-text">
                                <strong>Created By:</strong>
                                <span className="value">{currentQuestion?.CreatedBy.Name}</span>
                            </p>
                            <p className="card-text">
                                <strong>Created On:</strong>
                                <span className="value">{convertIsoToNormalTime(currentQuestion?.CreatedOn).date}</span>
                                <span className="value">{convertIsoToNormalTime(currentQuestion?.CreatedOn).time}</span>
                            </p>
                            <p className="card-text">
                                <strong>Time Elapsed:</strong>
                                <span className="value">{getTimeElapsed(currentQuestion?.CreatedOn)}</span>
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>

            <div className="row my-3">
                <div className="col">
                    <QuestionDetailsPreview QuestionName={currentQuestion?.QuestionName} ProblemStatement={currentQuestion?.ProblemStatement} Constraints={currentQuestion?.Constraints} InputFormat={currentQuestion?.InputFormat} OutputFormat={currentQuestion?.OutputFormat} SampleTestCases={currentQuestion?.TestCases} TimeLimitPerTestCase={1} MemoryLimitPerTestCase={30} />
                </div>
            </div>
            <div className="row my-3">
                <CodeEditor />
            </div>
            <div className="row my-3">
                <div className="col">
                    <Button variant="primary" className="w-100">Run</Button>
                </div>
                <div className="col">
                    <Button variant="primary" className="w-100">Submit</Button>
                </div>
            </div>
        </>
    );
}

export default SolveQuestion;