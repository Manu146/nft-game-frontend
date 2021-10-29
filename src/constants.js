const CONTRACT_ADDRESS = "0x0a6c1A94e203C2293F635E3C2D8B5f5C723b2E42";

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
    armor: characterData.armor?.toNumber(),
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };
