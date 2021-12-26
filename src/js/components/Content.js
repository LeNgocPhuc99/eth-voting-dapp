import React from "react";
import Table from "./Table";
import Form from "./Form";

function Content(props) {
  return (
    <div>
      <Table candidates={props.candidates} />
      <hr />
      <Form candidates={props.candidates} castVote={props.castVote} />
      <p>Your account: {props.account}</p>
    </div>
  );
}

export default Content;
