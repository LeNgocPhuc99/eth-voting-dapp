import React, { useRef } from "react";

function Form(props) {
  const candidateId = useRef(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.castVote(candidateId.current.value);
      }}
    >
      <div className="form-group">
        <label>Select Candidate</label>
        <select ref={candidateId} className="form-control">
          {props.candidates.map((candidate, key) => {
            return (
              <option key={key} value={candidate.id}>
                {candidate.name}
              </option>
            );
          })}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Vote
      </button>
      <hr />
    </form>
  );
}

export default Form;
