import React from "react";

function Candidates(props) {
  return (
    <table className="table">
      <tbody>
        {props.candidates.map((candidate, key) => {
          return (
            <tr key={key}>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Candidates;
