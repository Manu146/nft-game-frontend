import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, transformCharacterData } from "../../constants";
import myEpicGame from "../../utils/MyEpicGame.json";
import ArenaCard from "../ArenaCard";
import LoadingIndicator from "../LoadingIndicator";

export default function Arena({ characterNFT, setCharacterNFT }) {
  const [gameContract, setGameContract] = useState(null);
  const [boss, setBoss] = useState(null);
  const [attackState, setAttackState] = useState("");
  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState("attacking");
        console.log("Attacking boss...");
        const attackTxn = await gameContract.attackBoss();
        await attackTxn.wait();
        console.log("attackTxn:", attackTxn);
        setAttackState("hit");
      }
    } catch (error) {
      console.error("Error attacking boss:", error);
      setAttackState("");
    }
  };

  useEffect(() => {
    const fetchBoss = async () => {
      const bossTxn = await gameContract.getBigBoss();
      console.log("Boss:", bossTxn);
      setBoss(transformCharacterData(bossTxn));
    };

    const onAttackComplete = (newBossHp, newPlayerHp) => {
      const bossHp = newBossHp.toNumber();
      const playerHp = newPlayerHp.toNumber();

      console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);

      setBoss((prevState) => {
        return { ...prevState, hp: bossHp };
      });

      setCharacterNFT((prevState) => {
        return { ...prevState, hp: playerHp };
      });
    };

    if (gameContract) {
      fetchBoss();
      gameContract.on("AttackComplete", onAttackComplete);
    }

    return () => {
      if (gameContract) {
        gameContract.off("AttackComplete", onAttackComplete);
      }
    };
  }, [gameContract]);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log("Ethereum object not found");
    }
  }, []);

  return (
    <div className="flex flex-col w-60 p-4 mx-auto items-center">
      {boss && (
        <>
          <div className="">
            <div className={`mb-6 animation-bg ${attackState}`}>
              <ArenaCard character={boss} />
            </div>
          </div>
          <button
            disabled={characterNFT.hp === 0}
            onClick={runAttackAction}
            className="w-8/12 text-white font-bold bg-gradient-to-r from-blue-400 to-green-400 p-2 rounded my-4"
          >
            Attack {boss.name}
          </button>
        </>
      )}
      <h2 className="text-white font-semibold text-lg mb-2">Your Knight</h2>
      <ArenaCard character={characterNFT} />
      {attackState === "attacking" && (
        <LoadingIndicator>
          <h2 className="text-white text-3xl font-bold">Attacking!</h2>
        </LoadingIndicator>
      )}
    </div>
  );
}
