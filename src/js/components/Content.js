import React from "react";
import Table from "./Table";

function Content(props) {
  return (
    <div>
      <Table candidates={props.candidates} />
      <p>Your account: {props.account}</p>
    </div>
  );
}

export default Content;
