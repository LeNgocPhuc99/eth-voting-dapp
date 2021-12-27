import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function VoteModal(props) {
  const [show, setShow] = useState(false);
  const [candidateId, changeId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleVote = () => {
    vote(candidateId);
  };

  const candidates = ["Candidate 1", "Candidate 2"];

  const vote = async (id) => {
    console.log(id);
  };

  const onFormChange = (e) => {
    changeId(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Vote
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose candidate from below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {candidates.map((candidate, key) => {
            return (
              <Form.Check
                label={candidate}
                value={key}
                key={key}
                onChange={onFormChange}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleVote}>
            Vote
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VoteModal;
