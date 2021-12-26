import { useState, useEffect } from "react";
import Web3 from "web3";
import Election from "../abis/Election.json";

function App() {
  const [account, setAccount] = useState();
  const [electionContract, setElectionContract] = useState("");
  const [candidates, setCandidates] = useState([]);

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
      const account = await web3.eth.getAccounts();
      setAccount(account);

      const networkId = await web3.eth.net.getId();

      const electionData = Election.networks[networkId];
      if (electionData) {
        // create smart contract instance
        let web3 = window.web3;
        const electionContract = new web3.eth.Contract(
          Election.abi,
          electionData.address
        );

        setElectionContract(electionContract);
        // load candidates
        const candidatesCount = await electionContract.methods
          .candidatesCount()
          .call();
        for (let i = 1; i <= candidatesCount; i++) {
          const candidate = await electionContract.methods.candidates(i).call();
          console.log(candidate);
          setCandidates((candidates) => [...candidates, candidate]);
        }
      } else {
        window.alert("Election contract is not deployed on this network");
      }
    } else if (!window.web3) {
      window.alert("Metamask is not detected");
    }
  };

  return (
    <div>
      <p>Ethereum Voting Dapp</p>
      <p>Your account: {account}</p>
    </div>
  );
}

export default App;
