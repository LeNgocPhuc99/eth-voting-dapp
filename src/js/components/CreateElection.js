import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter election name"
            onChange={onChangeElectionName}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Description your Election"
            onChange={onChangeDescription}
            required
          />
        </div>

        <div className="form-group">
          <label>Candidate 1</label>
          <input
            type="text"
            className="form-control"
            placeholder="Candidate Name"
            name="candidate"
            required
          />
        </div>

        <div className="form-group">
          <label>Candidate 2</label>
          <input
            type="text"
            className="form-control"
            placeholder="Candidate Name"
            name="candidate"
            required
          />
        </div>

        <div>
          <button
            className="btn btn-success grid-item"
            type="submit"
            style={{ width: 100 }}
          >
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
          </button>
        </div>

        <br />
      </form>
    </div>
  );
}

export default CreateElection;
