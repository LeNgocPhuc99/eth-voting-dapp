import React from "react";
import { Table } from "react-bootstrap";

function Candidates(props) {
  return (
    <Table striped bordered hover>
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
    </Table>
  );
}

export default Candidates;
