import { useState, useEffect } from "react";
import TestCase from "../TestCase";

function TestcasesTab({ TestCases, handleInputChange }) {
    const [testcases, setTestcases] = useState(TestCases);

    useEffect(() => {
        setTestcases(TestCases); // Update the testcases when the TestCases prop changes from the parent
    }, [TestCases]);

    // Function that adds a new testcase
    const addTestcase = () => {
        const newTestcases = [...testcases, { input: "", sampleTestCase: false }];
        setTestcases(newTestcases);
        handleInputChange("TestCases", newTestcases);
    };

    // Function that removes the last testcase
    const removeTestcase = () => {
        if (testcases.length === 1) return; // Ensure at least one testcase remains
        const newTestcases = testcases.slice(0, -1); // Remove the last testcase
        setTestcases(newTestcases);
        handleInputChange("TestCases", newTestcases);
    };

    // Function that toggles the value of sampleTestCase
    const toggleSample = (index) => {
        const updatedTestcases = [...testcases];
        updatedTestcases[index].sampleTestCase = !updatedTestcases[index].sampleTestCase;
        setTestcases(updatedTestcases);
        handleInputChange("TestCases", updatedTestcases);
    };

    // Function that updates the value of the testcase
    const updateTestcase = (index, input) => {
        const updatedTestcases = [...testcases];
        updatedTestcases[index].input = input;
        setTestcases(updatedTestcases);
        handleInputChange("TestCases", updatedTestcases);
    };

    return (
        <div style={{ color: "white", background: "#f4f7fa", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <div className="container">
                <div className="row my-4">
                    <div className="col">
                        <button 
                            type="button" 
                            className="btn w-100 py-3" 
                            style={{
                                background: "linear-gradient(90deg, #1e88e5, #43a047)",
                                color: "#fff",
                                boxShadow: "0px 4px 12px rgba(30, 136, 229, 0.3)"
                            }} 
                            onClick={addTestcase}
                        >
                            Add Testcase
                        </button>
                    </div>
                    <div className="col">
                        <button 
                            type="button" 
                            className="btn w-100 py-3" 
                            style={{
                                background: "linear-gradient(90deg, #ff7043, #43a047)",
                                color: "#fff",
                                boxShadow: "0px 4px 12px rgba(255, 112, 67, 0.3)"
                            }} 
                            onClick={removeTestcase}
                        >
                            Remove Testcase
                        </button>
                    </div>
                </div>

                {testcases.map((testcase, index) => (
                    <div className="row my-3" key={index}>
                        <div className="col">
                            <TestCase
                                index={index}
                                toggleSample={toggleSample}
                                name={`Testcase ${index + 1}`}
                                isChecked={testcase.sampleTestCase}
                                input={testcase.input}
                                updateTestcase={updateTestcase}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 5px 15px rgba(30, 136, 229, 0.4);
                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .col {
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
}

export default TestcasesTab;
