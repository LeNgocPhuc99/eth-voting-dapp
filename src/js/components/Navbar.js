import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/active" className="navbar-brand">
        LNP
      </Link>
      <div className="collapsed navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/createElection" className="nav-link">
              New Election
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/active" className="nav-link">
              Active Election
            </Link>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right navright">
          <li className="navbar-item">
            <Link to="/active" className="nav-link">
              {props.account}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
