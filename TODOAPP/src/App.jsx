import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WalletConnect from './components/WalletConnect'
import Todolist from './components/Todolist'

function App() {
  
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  

  return (
    <>
      <h1>ToDo dApp</h1>
      <WalletConnect setProvider={setProvider} setSigner={setSigner} setAddress={address}/>
      {signer && <Todolist signer={signer} />}
    </>
  )
}

export default App
