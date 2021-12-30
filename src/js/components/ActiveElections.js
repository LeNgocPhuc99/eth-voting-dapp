import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ElectionContract from "../../abis/Election.json";
import Election from "./Election";

function ActiveElections(props) {
  // const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ float: "right", marginBottom: "10px" }}>
        <img
          style={{ width: "25px", marginRight: "20px", cursor: "pointer" }}
          onClick={loadData}
          src="../../public/refresh.png"
        />
        <Link to="/createElection">
          <img
            style={{ width: "25px", cursor: "pointer" }}
            src="../../public/add.png"
          />
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Election ID</th>
            <th style={{ textAlign: "center" }}>Election Name</th>
            <th style={{ textAlign: "center" }}>Candidates</th>
            <th style={{ textAlign: "center" }}>Vote</th>
          </tr>
        </thead>

        <tbody>{elections}</tbody>
      </Table>

      <center>
        {loading ? <Spinner animation="border" variant="success" /> : <></>}
      </center>
    </div>
  );
}

export default ActiveElections;
