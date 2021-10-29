import "./card.css";
import { useState } from "react";

export default function CharacterCard({ character, mintAction }) {
  const [style, setStyle] = useState({});
  const rotateCard = (e) => {
    let { width, height } = e.target.getBoundingClientRect();
    let xAxis = (e.pageX - width / 2) / 40;
    let yAxis = (e.pageY - height / 2) / 30;
    setStyle({
      transform: `perspective(400px) rotateX(${xAxis}deg) rotateY(${yAxis}deg) scale(1.05)`,
    });
  };

  const rotateToOrigin = () => {
    setStyle({
      transform: `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`,
    });
  };

  return (
    <div
      style={style}
      onMouseMove={rotateCard}
      onMouseLeave={rotateToOrigin}
      className="card p-4 bg-gradient-to-br from-green-400 via-blue-400 via-purple-800 to-pink-600  rounded-lg animated-bg"
    >
      <div className="flex flex-col card-content">
        <div className="w-full rounded-lg bg-black bg-opacity-70 mb-3">
          <img
            src={character.imageURI}
            alt="character-img"
            className="w-full h-80 -mt-7"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg text-white">{character.name}</h3>
          <div className="flex justify-between  mb-2">
            <div className="p-1">
              <img src="" alt="" />
              <span>HP</span>
              <br />
              <span>{character.hp}</span>
            </div>
            <div className="p-1">
              <img src="" alt="" />
              <span>ATK</span>
              <br />
              <span>{character.attackDamage}</span>
            </div>
            <div className="p-1">
              <img src="" alt="" />
              <span>ARM</span>
              <br />
              <span>{character.armor}</span>
            </div>
          </div>
          <button
            className="p-2 bg-white text-gray-900 rounded-lg text-lg font-semibold"
            onClick={mintAction}
          >
            Mint character
          </button>
        </div>
      </div>
    </div>
  );
}
