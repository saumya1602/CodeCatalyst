import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchAPI } from '../../../Scripts/Axios';
import LoadingSpinner from '../../../components/Spinners/Spinners';
import SolveQuestion from './SolveQuestion';
import SubmitAssignmentNavbar from '../../../components/Navbar/SubmitAssignmentNavbar';
import AssignmentDetailsAccordion from '../../../components/Accordion/AssignmentDetailsAccordion';

let DefaultUserCode = 
`#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`;

function SolveAssignment() {
    const { _id } = useParams();
    const [AssignmentDetails, setAssignmentDetails] = useState(null);
    const [UserCodes, setUserCodes] = useState([]);

    useEffect(() => {
        const FetchAssignment = async () => {
            try {
                console.log("fetching assignment Details");
                const response = await fetchAPI(`/students/getPendingAssignment/${_id}`);
                console.log(response.data);
                if (response.data.success) {
                    toast.success(response.data.message);
                    setAssignmentDetails(response.data.Assignment);

                    const defaultSolutionCodes = response.data.Assignment.Questions.map((question) => {
                        return {
                            QuestionName: question.QuestionName,
                            UserCode: DefaultUserCode,
                            QuestionId: question._id
                        };
                    });
                    setUserCodes(defaultSolutionCodes);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(`Error fetching Assignment. Please try again later. err : ${error}`);
            }
        };
        FetchAssignment();
    }, []);

    if (AssignmentDetails === null) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <SubmitAssignmentNavbar _id={_id} UserCodes={UserCodes} />
            <div className="container" style={{ color: '#333', background: "linear-gradient(135deg, #ffffff, #f0f4f8)" }}>
                <div className="row">
                    <div className="col">
                        <AssignmentDetailsAccordion
                            PostedBy={AssignmentDetails?.PostedBy.Name}
                            PostedOn={AssignmentDetails?.PostedOn}
                            DueTimestamp={AssignmentDetails?.DueTimestamp}
                            Batches={AssignmentDetails?.Batches}
                            Year={AssignmentDetails?.Year}
                            NumberOfQuestions={AssignmentDetails?.Questions.length}
                            AIAssistance={AssignmentDetails.AIAssistance}
                        />
                    </div>
                </div>
                <SolveQuestion 
                    Questions={AssignmentDetails?.Questions} 
                    AssignmentId={AssignmentDetails?._id} 
                    UserCodes={UserCodes} 
                    setUserCodes={setUserCodes} 
                    AIAssistance={AssignmentDetails.AIAssistance} 
                />
            </div>

            {/* Additional Styles */}
            <style jsx>{`
                .container {
                    background: linear-gradient(135deg, #ffffff, #f0f4f8); /* Light gradient */
                    border-radius: 15px;
                    padding: 20px;
                }

                .row {
                    margin-top: 20px;
                }

                /* Assignment Details Accordion */
                .accordion-button {
                    background: linear-gradient(135deg, #1e88e5, #43a047); /* Gradient button */
                    border: none;
                    color: white;
                    text-align: left;
                    padding: 15px 20px;
                    box-shadow: 0px 6px 15px rgba(30, 136, 229, 0.4);
                }

                .accordion-button:hover {
                    background: linear-gradient(135deg, #43a047, #1e88e5);
                    box-shadow: 0px 10px 25px rgba(30, 136, 229, 0.5);
                }

                .accordion-body {
                    background: rgba(255, 255, 255, 0.7);
                    padding: 20px;
                    border-radius: 10px;
                }

                /* Custom button styles */
                .btn-dark {
                    background: linear-gradient(90deg, #1e88e5, #43a047); /* Vibrant gradient */
                    border: none;
                    color: white;
                    box-shadow: 0px 6px 15px rgba(30, 136, 229, 0.4);
                }

                .btn-dark:hover {
                    background: linear-gradient(90deg, #43a047, #1e88e5);
                    box-shadow: 0px 8px 20px rgba(30, 136, 229, 0.5);
                }
            `}</style>
        </>
    );
}

export default SolveAssignment;
