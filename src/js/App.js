import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import MainContract from "../abis/MainContract.json";

import CreateElection from "./components/CreateElection";
import ActiveElections from "./components/ActiveElections";
import Navbar from "./components/Navbar";

function App() {
  const [account, setAccount] = useState();
  const [mainContract, setMainContract] = useState();
  const [web3, setWeb3] = useState();

  useEffect(() => {
    const ethEnable = async () => {
      loadBlockchainData();
    };
    ethEnable();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      // connect to metamask
      let web3 = window.web3;
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();

      const mainContractData = MainContract.networks[networkId];
      if (mainContractData) {
        // create smart contract main contract instance
        let web3 = window.web3;
        const mainContract = new web3.eth.Contract(
          MainContract.abi,
          mainContractData.address
        );

        setMainContract(mainContract);
      } else {
        window.alert("Main contract is not deployed on this network");
      }
    } else if (!window.web3) {
      window.alert("Metamask is not detected");
    }
  };

  return (
    <BrowserRouter>
      <Navbar account={account} />
      <br />
      <ActiveElections
        web3={web3}
        account={account}
        mainContract={mainContract}
      />
    </BrowserRouter>
  );
}

export default App;
