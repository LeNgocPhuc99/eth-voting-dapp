import React from "react";

function Table(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {props.candidates.map((candidate, key) => {
          return (
            <tr>
              <th>{candidate.id}</th>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
