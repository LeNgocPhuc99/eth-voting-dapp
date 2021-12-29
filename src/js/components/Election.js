import React from "react";
import VoteModal from "./VoteModal";
import Candidates from "./Candidates";

function Election(props) {
  // console.log(props.candidates);
  return (
    <tr>
      <td>{props.election.electionId}</td>

      <td>
        {props.election.electionName}
        <br />
        <font className="text-muted" size="2">
          <b>{props.election.electionDescription}</b>
        </font>
        <br />
        <font className="text-muted" size="2">
          {props.election.electionAddress}
        </font>
      </td>

      <td style={{ textAlign: "center" }}>
        <Candidates candidates={props.election.candidates} />
      </td>

      <td style={{ textAlign: "center" }}>
        {!props.election.hasVoted ? (
          <VoteModal
            account={props.election.account}
            election={props.election.electionInstance}
            candidates={props.election.candidates}
          />
        ) : (
          <font size="2" color="green">
            You have voted!
          </font>
        )}
      </td>
    </tr>
  );
}

export default Election;
