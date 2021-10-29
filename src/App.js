import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, transformCharacterData } from "./constants";
import myEpicGame from "./utils/MyEpicGame.json";
import "./App.css";
import WalletModal from "./Components/WalletModal";
import SelectCharacter from "./Components/SelectCharacter";
import Arena from "./Components/Arena";
import LoadingIndicator from "./Components/LoadingIndicator";

const GITHUB_LINK = "https://github.com/Manu146";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      try {
        console.log("Checking for Character NFT on address:", currentAccount);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicGame.abi,
          signer
        );

        const txn = await gameContract.checkIfUserHasNFT();
        if (txn.name) {
          console.log("User has character NFT");
          setCharacterNFT(transformCharacterData(txn));
        } else {
          console.log("No character NFT found!");
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (currentAccount) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="bg-gradient-to-br from-black via-gray-800 to-green-900 min-h-screen text-center">
      <div className="w-4/5 mx-auto min-h-screen flex flex-col justify-between bg-cgray opacity-95 flex-wrap">
        <div className="p-8">
          <p className="m-0 text-3xl font-bold text-white">
            ⚔️ Hero Knights ⚔️
          </p>
          <p className="text-2xl text-white">Team up to protect the realm!</p>
          {!currentAccount && (
            <div className="flex flex-col m-auto max-w-lg">
              <img
                src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
                alt="Monty Python Gif"
              />
            </div>
          )}
          {currentAccount && !characterNFT && (
            <SelectCharacter characterState={[characterNFT, setCharacterNFT]} />
          )}
          {currentAccount && characterNFT && (
            <Arena
              characterNFT={characterNFT}
              setCharacterNFT={setCharacterNFT}
            />
          )}
        </div>
        <div className="flex justify-center items-center pb-7">
          <a
            className="text-gray-100 text-md font-semibold"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          >
            Made with ❤️ by Manu146
          </a>
        </div>
      </div>
      <WalletModal
        isOpen={currentAccount == null}
        btnAction={connectWalletAction}
        closeModal={() => {}}
      />
      {isLoading && <LoadingIndicator />}
    </div>
  );
};

export default App;
