import abi from "./Lottery.json";

export const contractAbi = abi.abi;

export const getColors = (color) => {
  let Obj = {
    pink: "red.200",
    teal: "teal",
    black: "blackAlpha.900",
    blue: "blue.400",
  };
  return Obj[color];
};
