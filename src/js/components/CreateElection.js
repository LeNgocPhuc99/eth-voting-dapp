import React, { useState } from "react";
import { Spinner, Form, Row, Col, Button } from "react-bootstrap";



function CreateElection(props) {
  const [electionName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let eCandidates = [];
    const candidateObj = document.getElementsByName("candidate").values();
    let i = 0;
    for (let val of candidateObj) {
      eCandidates[i] = val.value;
      i++;
    }

    setLoading(true);
    await props.mainContract.methods
      .createElection([electionName, description], eCandidates)
      .send({ from: props.account });
    setLoading(false);
    window.location = "./active";
  };

  const onChangeElectionName = (e) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="container card">
      <h3>Create New Election</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="electionName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter election name"
            onChange={onChangeElectionName}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="electionDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description your Election"
            onChange={onChangeDescription}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="candidate1">
          <Form.Label>Candidate 1</Form.Label>
          <Form.Control
            name="candidate"
            placeholder="Candidate Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="candidate2">
          <Form.Label>Candidate 2</Form.Label>
          <Form.Control
            name="candidate"
            placeholder="Candidate Name"
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default CreateElection;
