import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState();

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
