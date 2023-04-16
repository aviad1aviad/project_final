import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null
  })
  return (
    <div className="App">
      <button
      onClick={async () => {
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"})
        console.log(accounts)
      } }
      > connect to metamsk </button> 
    </div>
  );
}

export default App;
