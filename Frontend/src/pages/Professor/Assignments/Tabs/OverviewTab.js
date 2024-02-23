import { Form, Row, Col, Tab } from 'react-bootstrap';


function OverviewTab({ formData, setFormData }) {

    return (
        <Tab.Pane eventKey="OverviewTab">
            <hr />
            <Form.Group as={Row} controlId="AssignmentName" className="mb-3 mt-3">
                <Form.Label column sm={2}>Name:</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="Enter assignment name" onChange={(e) => setFormData({ ...formData, AssignmentName: e.target.value })} />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="DueTimestamp" className="mb-3">
                <Form.Label column sm={4}>Date and Time:</Form.Label>
                <Col sm={8}>
                    <Form.Control type="datetime-local" onChange={(e) => setFormData({ ...formData, DueTimestamp: e.target.value })} />
                </Col>
            </Form.Group>
            <hr />
        </Tab.Pane>
    )

}

export default OverviewTab;