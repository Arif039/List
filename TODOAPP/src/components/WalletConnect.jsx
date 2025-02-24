
import {useState} from "react"; 
import { ethers } from "ethers"; 

function WalletConnect ({setProvider, setSigner}) {

    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState(""); 

    async function connectWallet () {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                console.log("Accounts:", accounts);
                
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                setProvider(provider);
                setSigner(signer);

                setConnected(true);
                setAddress(accounts[0]);

                console.log("Provider:", provider);
                console.log("Signer:", signer);
                console.log("Address:", accounts[0]);

            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("Please install MetaMask...");
        }
    }

    return (
        <div>
        {
            !connected ? (<button onClick={connectWallet}>Connect Wallet</button>) 
            : (<p>Connected Address: {address} </p> )
        }
        </div>
    );
}

export default WalletConnect;

