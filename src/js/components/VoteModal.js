import React, { useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

function VoteModal(props) {
  const [show, setShow] = useState(false);
  const [candidateId, changeId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleVote = () => {
    vote(candidateId);
  };

  const vote = async (_id) => {
    setLoading(true);
    await props.election.methods.vote(_id).send({ from: props.account });
    setLoading(false);
    window.location = "./active";
  };

  const onFormChange = (e) => {
    changeId(e.target.value);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
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
          <Button variant="success" onClick={handleVote}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span>Vote</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VoteModal;
