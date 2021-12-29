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

  const vote = async (_id) => {
    await props.election.methods.vote(_id).send({from:props.account});
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
          {props.candidates.map((candidate, key) => {
            return (
              <Form.Check
                label={candidate.name}
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
