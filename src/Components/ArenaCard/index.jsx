export default function ArenaCard({ character }) {
  return (
    <div className="animated-bg w-full p-4 bg-gradient-to-br from-green-400 via-blue-400 via-purple-800 to-pink-600  rounded-lg">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-bold mb-2">{character.name}</h3>
        <div className="rounded-lg bg-black bg-opacity-70">
          <img
            src={character.imageURI}
            alt={character.name}
            className="w-full "
          />
          <div className="bg-white rounded-b-lg flex justify-center">
            <span className="text-md text-black font-semibold">
              {character.hp}/{character.maxHp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
