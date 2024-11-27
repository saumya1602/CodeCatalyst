import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import QuestionDetailsPreview from '../../../components/CommonComponents/QuestionDetailsPreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
import QuestionDetailsAccordion from "../../../components/Accordion/QuestionDetailsAccordion";
import DryRunModal from "../../../components/Modal/DryRunModal";
import CodeScore from "../../../components/CommonComponents/CodeScore";
import AIAssistanceModal from "../../../components/Modal/AIAssistanceModal";


// Questions is an array of objects as described earlier

function SolveQuestion({ Questions, AssignmentId, UserCodes, setUserCodes, AIAssistance = false }) {
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

    const handleUpdateCode = (code) => {
        // Update the corresponding solution code in the state
        const updatedUserCodes = [...UserCodes];
        updatedUserCodes[currentQuestionIndex].UserCode = code;
        setUserCodes(updatedUserCodes);
    };

    useEffect(() => {
        if (Questions) {
            setCurrentQuestion(Questions[0])
        }
    }, [Questions])

    return (
        <>
            <div className="row my-3 rounded">
                <div className="col-4 text-center">
                    <Button 
                        variant="primary" 
                        onClick={handlePreviousQuestion} 
                        disabled={currentQuestionIndex === 0} 
                        className="w-100"
                        style={{
                            background: "linear-gradient(90deg, #1e88e5, #43a047)", 
                            border: "none",
                            boxShadow: "0px 6px 15px rgba(30, 136, 229, 0.4)",
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center rounded" 
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <span style={{ color: "white" }}>Question {currentQuestionIndex + 1}</span>
                </div>
                <div className="col-4 text-center">
                    <Button 
                        variant="primary" 
                        onClick={handleNextQuestion} 
                        disabled={currentQuestionIndex === Questions?.length - 1} 
                        className="w-100"
                        style={{
                            background: "linear-gradient(90deg, #1e88e5, #43a047)", 
                            border: "none",
                            boxShadow: "0px 6px 15px rgba(30, 136, 229, 0.4)",
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>
            </div>

            <div className="row" style={{ color: "white" }}>
                <QuestionDetailsAccordion 
                    Name={currentQuestion?.CreatedBy.Name} 
                    CreatedOn={currentQuestion?.CreatedOn} 
                />
            </div>

            <div className="row">
                <div className="col">
                    <QuestionDetailsPreview 
                        QuestionName={currentQuestion?.QuestionName} 
                        ProblemStatement={currentQuestion?.ProblemStatement} 
                        Constraints={currentQuestion?.Constraints} 
                        InputFormat={currentQuestion?.InputFormat} 
                        OutputFormat={currentQuestion?.OutputFormat} 
                        SampleTestCases={currentQuestion?.TestCases} 
                        TimeLimitPerTestCase={5} 
                        MemoryLimitPerTestCase={30} 
                    />
                </div>
            </div>

            <div className="row my-3">
                <CodeScore Code={UserCodes[currentQuestionIndex].UserCode} />
                <CodeEditor defaultCode={UserCodes[currentQuestionIndex].UserCode} onUpdateCode={handleUpdateCode} />
            </div>

            <div className="row my-3">
                <div className="col">
                    <DryRunModal 
                        CodeToRun={UserCodes[currentQuestionIndex].UserCode} 
                        AssignmentId={AssignmentId} 
                        QuestionId={currentQuestion?._id} 
                    />
                </div>
                <div className="col">
                    <AIAssistanceModal 
                        CodeToRun={UserCodes[currentQuestionIndex].UserCode} 
                        ProblemStatement={currentQuestion?.ProblemStatement} 
                        AIAssistance={AIAssistance} 
                    />
                </div>
            </div>
        </>
    );
}

export default SolveQuestion;
