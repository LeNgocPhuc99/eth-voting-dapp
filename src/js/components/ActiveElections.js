import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ElectionContract from "../../abis/Election.json";
import Election from "./Election";

function ActiveElections(props) {
  // const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);

  const loadData = async () => {
    const electionCount = await props.mainContract.methods.electionId().call();
    // Election contract instance , election info, election component
    let electionComponents = [];
    for (let i = 0; i < electionCount; i++) {
      const electionsAddress = await props.mainContract.methods
        .Elections(i)
        .call();
      const election = await new props.web3.eth.Contract(
        ElectionContract.abi,
        electionsAddress
      );

      // load election info
      let electionDetails = [];
      electionDetails.account = props.account;
      electionDetails.electionInstance = election;
      electionDetails.electionAddress = electionsAddress;
      electionDetails.hasVoted = await election.methods
        .voters(props.account)
        .call();
      electionDetails.electionName = await election.methods.name().call();
      electionDetails.electionDescription = await election.methods
        .description()
        .call();
      electionDetails.electionId = i;

      // load candidates info of election
      const candidateCount = await election.methods.candidatesCount().call();
      let candidates = [];

      for (let j = 0; j < candidateCount; j++) {
        candidates.push(await election.methods.candidates(j).call());
      }

      electionDetails.candidates = candidates;
      electionComponents[i] = <Election key={i} election={electionDetails} />;
    }
    setElections(electionComponents);
  };

  return (
    <div className="container">
      <div style={{ float: "right", marginBottom: "10px" }}>
        <img
          style={{ width: "25px", marginRight: "20px", cursor: "pointer" }}
          onClick={loadData}
          src="../../public/refresh.png"
        />
        <img
          style={{ width: "25px", cursor: "pointer" }}
          src="../../public/add.png"
        />
      </div>

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th style={{ width: "120px" }}>Election ID</th>
            <th>Election Name</th>
            <th style={{ textAlign: "center" }}>Candidates</th>
            <th style={{ textAlign: "center" }}>Vote</th>
          </tr>
        </thead>

        <tbody>{elections}</tbody>
      </table>

      <center>
        <button
          style={{ width: 100 }}
          className="btn btn-primary"
          onClick={loadData}
        >
          Refresh
        </button>
      </center>
    </div>
  );
}

export default ActiveElections;
