import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/load-contract';
import Web3 from 'web3';

function App() {
  
  const [web3Api, setWeb3Api] = useState({
    provider:null,
    web3:null,
    contract:null
  })

  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)
  const [deposit, setDeposit] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const[name, setName] = useState('');
  const[nameList, setNameList] = useState([]);

  function hamdleNameChange(e){
    setName(e.target.value);
  }

  function addName(){
    setNameList([...nameList,name])
    console.log(nameList)
  }

  function handelDeposit(e){
    setDeposit(e.target.value)
  }

  function handelWithdrawAmount(e){
    setWithdrawAmount(e.target.value)
  }

  useEffect(()=>{
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Simplebank", provider)

      if(provider){
        setWeb3Api(
          {
            provider:provider,
            web3: new Web3(provider),
            contract:contract
          }
        )
      }
      else {
        console.log("Pleas install MetaMask")
      }
    }
    loadProvider()
  },[])

  const addFunds = async () => {
    const {contract,web3} = web3Api
    await contract.addFunds({
      from:account,
      value:web3.utils.toWei(deposit,"ether")
    })
  }
  const addFunds_private_with = async () => {
    const {contract,web3} = web3Api
    await contract.addFunds({
      from:account,
      value:web3.utils.toWei("1.2","ether")
    })
  }
  const addFunds_private_without = async () => {
    const {contract,web3} = web3Api
    await contract.addFunds({
      from:account,
      value:web3.utils.toWei("1","ether")
    })
  }
  const addFunds_mini_with = async () => {
    const {contract,web3} = web3Api
    await contract.addFunds({
      from:account,
      value:web3.utils.toWei("0.8","ether")
    })
  }
  const addFunds_mini_without = async () => {
    const {contract,web3} = web3Api
    await contract.addFunds({
      from:account,
      value:web3.utils.toWei("0.5","ether")
    })
  }
  const withDraw = async () => {
    const {contract,web3} = web3Api
    const withDrawAmount = web3.utils.toWei(withdrawAmount,"ether")
    await contract.withDraw(withDrawAmount, {from:account})
  }

  useEffect(() => {
    const loadBalance = async () => {
      const {contract,web3} = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, "ether"))
    } 
    web3Api.contract && loadBalance()   
  },[web3Api])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  },[web3Api.web3])

  return (
    <div className="App">
      <h1> השכרת רכב </h1>
      <h2> הכנס פרטים </h2>
      <input value={name} on onChange={hamdleNameChange}/> שם מלא
      
      <h2> אנא בחר סוג רכב מבוקש </h2>
      <h4> רכב פרטי </h4>
      
      <button onClick = {() => {addFunds_private_with(); addName();}} > עם אפשרות ביטול (1.2 ether) </button>
      <button onClick={() => {addFunds_private_without(); addName();}} >ללא אפשרות ביטול (1 ether) </button>

      <h4> רכב מיני </h4>

      <button onClick={() => {addFunds_mini_with(); addName();}} > עם אפשרות ביטול (0.8 ether) </button>
      <button onClick={() => {addFunds_mini_without(); addName();}} > ללא אפשרות ביטול (0.5 ether) </button>
    <h2>רשימת שוכרים </h2>
    <ul>
      {nameList.map(
        name => (
          <li>{name}</li>
        )
      )}
    </ul>
    <h3> בקשת החזר </h3>
    <div>
      <input onChange={handelWithdrawAmount}/>
      <button onClick={withDraw}> החזר </button>
    </div>

    <h4> כתובת המשלם </h4>
    <div> {account} </div>
    <h4> מאזן כספי נוכחי </h4>
    <div> {balance} Ether </div>  
    
    </div>
  );
}

export default App;
//