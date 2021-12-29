import React, { useState } from "react";

function CreateElection(props) {
  const [electionName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [candidates, setCandidates] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let eCandidates = [];
    const candidateObj = document.getElementsByName("candidate").values();
    let i = 0;
    for (let val of candidateObj) {
      eCandidates[i] = val.value;
      i++;
    }

    setCandidates((candidates) => [...candidates, ...eCandidates]);

    console.log(eCandidates);
    console.log(electionName);
    console.log(description);

    await props.mainContract.methods
      .createElection([electionName, description], eCandidates)
      .send({ from: props.account });

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
            Submit
          </button>
        </div>

        <br />
      </form>
    </div>
  );
}

export default CreateElection;
