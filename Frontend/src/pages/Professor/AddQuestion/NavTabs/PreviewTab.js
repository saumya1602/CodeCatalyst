import { toast } from "react-toastify";
import axios from "axios";
import QuestionDetailsPreview from "../../../../components/CommonComponents/QuestionDetailsPreview";
import HiddenQuestionDetailsPreview from "../../../../components/CommonComponents/HiddenQuestionDetailsPreview";

function PreviewTab({ formData, FormMetaData, editQuestion = false, _id }) {

    const validateForm = () => {
        if (formData.QuestionName === "") {
            toast.error("Question Name is required");
            return true;
        }
        if (formData.ProblemStatement === "") {
            toast.error("Problem Statement is required");
            return true;
        }
        if (formData.Constraints === "") {
            toast.error("Constraints is required");
            return true;
        }
        if (formData.InputFormat === "") {
            toast.error("Input Format is required");
            return true;
        }
        if (formData.OutputFormat === "") {
            toast.error("Output Format is required");
            return true;
        }
        if (formData.TestCases.length === 0) {
            toast.error("Test Cases are required");
            return true;
        } else {
            if (!formData.TestCases.some(testcase => !testcase.sampleTestCase)) { // no object with sampleTestCase = false
                toast.error("At least one Hidden Test Case is required");
                return true;
            }
            if (!formData.TestCases.some(testcase => testcase.sampleTestCase)) { // no object with sampleTestCase = true
                toast.error("At least one Sample Test Case is required");
                return true;
            }
        }
        if (formData.SolutionCode === "") {
            toast.error("Solution Code is required");
            return true;
        }
        if (formData.RandomTestChecked && formData.RandomTestCode === "") {
            toast.error("Random Test Code is required, if you have checked the Random Test Case Generator");
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default refresh by the browser
        console.log("Submit");
        if (validateForm()) return; // Reuse validation logic
        console.log("All fields are filled");
        console.log(formData);
        try {
            if (!formData.RandomTestChecked) { // if Random Test Case Generator is not checked, then RandomTestCode should be empty
                formData.RandomTestCode = "";
            }
            const response = await axios.post("/professors/createQuestion", formData, { withCredentials: true });
            toast[response.data.success ? "success" : "error"](response.data.message);
            if (response.data.success) {
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            toast.error(`Error while creating question: ${err.message || err}`);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevents default refresh by the browser
        console.log("Update");
        if (validateForm()) return; // Reuse validation logic
        console.log("All fields are filled");
        console.log(formData);
        try {
            if (!formData.RandomTestChecked) { // if Random Test Case Generator is not checked, then RandomTestCode should be empty
                formData.RandomTestCode = "";
            }
            formData._id = _id;
            const response = await axios.put("/professors/updateQuestion", formData, { withCredentials: true });
            toast[response.data.success ? "success" : "error"](response.data.message);
            if (response.data.success) {
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            toast.error(`Error while updating question: ${err.message || err}`);
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row my-4">
                    <div className="col">
                        <div className="preview-section">
                            <h2 className="fw-bold mb-3" style={{ color: "#1e88e5", textShadow: "0px 4px 15px rgba(30, 136, 229, 0.4)" }}>Preview Question</h2>
                            <QuestionDetailsPreview
                                QuestionName={formData.QuestionName}
                                ProblemStatement={formData.ProblemStatement}
                                Constraints={formData.Constraints}
                                InputFormat={formData.InputFormat}
                                OutputFormat={formData.OutputFormat}
                                SampleTestCases={formData.TestCases.filter(testCase => testCase.sampleTestCase)}
                                TimeLimitPerTestCase={5}
                                MemoryLimitPerTestCase={30}
                                FormMetaData={FormMetaData}
                            />
                        </div>
                        <div className="hidden-test-case-preview mt-5">
                            <h2 className="fw-bold mb-3" style={{ color: "#ff7043", textShadow: "0px 4px 15px rgba(255, 112, 67, 0.4)" }}>Hidden Test Cases</h2>
                            <HiddenQuestionDetailsPreview
                                HiddenTestCases={formData.TestCases.filter(testCase => !testCase.sampleTestCase)}
                                SolutionCode={formData.SolutionCode}
                                RandomTestChecked={formData.RandomTestChecked}
                                RandomTestCode={formData.RandomTestCode}
                                FormMetaData={FormMetaData}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        {editQuestion ?
                            <button
                                className="btn w-100 py-3"
                                style={{
                                    background: "linear-gradient(90deg, #1e88e5, #43a047)",
                                    color: "#fff",
                                    boxShadow: "0px 5px 15px rgba(30, 136, 229, 0.3)"
                                }}
                                onClick={handleUpdate}
                            >
                                Update Question
                            </button>
                            :
                            <button
                                className="btn w-100 py-3"
                                style={{
                                    background: "linear-gradient(90deg, #43a047, #ff7043)",
                                    color: "#fff",
                                    boxShadow: "0px 5px 15px rgba(255, 112, 67, 0.3)"
                                }}
                                onClick={handleSubmit}
                            >
                                Create Question
                            </button>
                        }
                    </div>
                </div>
            </div>

            <style jsx>{`
                .preview-section {
                    background: #f0f4f8;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                }

                .hidden-test-case-preview {
                    background: #fff3e0;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                }

                .btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 5px 15px rgba(30, 136, 229, 0.4);
                }
            `}</style>
        </div>
    );
}

export default PreviewTab;
