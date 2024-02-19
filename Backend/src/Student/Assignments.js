const { readDB } = require("../db/mongoOperations");
const { assignmentSchema, professorsSchema } = require("../db/schema");

async function GetProfessor(id, college) {
    //read the professor from the database
    // return the professor object from the database Excluding Password
    if (!id || !college) {
        return {}
    }
    try {
        const thisProfessor = await readDB("Professors", college, { _id: id }, professorsSchema)

        if (thisProfessor.length > 0) {
            //return the professor object from the database Excluding Password
            return { Name: thisProfessor[0].Name }
        }
        else
            return {}
    }
    catch (error) {
        return {}
    }
}

// This function is used to get the Pending assignments for the student, which are not submitted yet and are due
function getStudentPendingAssignmentsRoute(req, res) {

    Querry = {
        Batches: { $in: req.decoded.DB.Batch },     // Batch should be in the list of batches
        Year: req.decoded.DB.Year,                  // Year should be same as the student's year
        DueTimestamp: { $gte: new Date() }          // Due date should be greater than or equal to current date
    }

    // Query the Assignments collection based on batch, year, and due date
    readDB("Assignments", req.decoded.Institution, Querry, assignmentSchema)

        .then(async (data) => {

            //iterate through the assignments and get the professor details for each assignment
            await Promise.all(data.map(async (assignment) => {
                let thisProfessor = await GetProfessor(assignment.PostedBy, req.decoded.Institution);
                console.log(thisProfessor)
                assignment.PostedBy = thisProfessor;
            }));

            res.status(200).json({
                success: true,
                message: "Pending Assignments fetched successfully",
                Assignments: data,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Failed to fetch Pending Assignments, err : ${error.message}`,
            });
        });
}

// This function is used to get the submitted assignments for the student
function getStudentSubmittedAssignmentsRoute(req, res) {

    Querry = {
        Batches: { $in: req.decoded.DB.Batch },     // Batch should be in the list of batches
        Year: req.decoded.DB.Year,                  // Year should be same as the student's year
        SubmittedBy: { $in: req.decoded._id }       // Student should be in the list of submitted students
    }

    readDB("Assignments", req.decoded.Institution, Querry, assignmentSchema)
        .then((data) => {
            res.status(200).json({
                success: true,
                message: "Submitted Assignments fetched successfully",
                Assignments: data,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Failed to fetch Submitted Assignments, err : ${error.message}`,
            });
        });
}

function getStudentMissedAssignmentsRoute(req, res) {

    Querry = {
        Batches: { $in: req.decoded.DB.Batch },     // Batch should be in the list of batches
        Year: req.decoded.DB.Year,                  // Year should be same as the student's year
        DueTimestamp: { $lt: new Date() },          // Due date should be less than current date
        SubmittedBy: { $nin: req.decoded._id }      // Student should not be in the list of submitted students
    }

    readDB("Assignments", req.decoded.Institution, Querry, assignmentSchema)
        .then(async (data) => {
            let Assignments = JSON.parse(JSON.stringify(data))
            //iterate through the assignments and get the professor details for each assignment
            await Promise.all(Assignments.map(async (assignment, index) => {
                let thisProfessor = await GetProfessor(assignment.PostedBy, req.decoded.Institution);
                console.log(thisProfessor);

                // Assuming assignment is mutable and PostedBy is directly modifiable
                assignment.PostedBy = thisProfessor;
            }));
            res.status(200).json({
                success: true,
                message: "Missed Assignments fetched successfully",
                Assignments: Assignments,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: `Failed to fetch Missed Assignments, err : ${error.message}`,
            });
        });
}

module.exports = { getStudentPendingAssignmentsRoute, getStudentSubmittedAssignmentsRoute, getStudentMissedAssignmentsRoute };