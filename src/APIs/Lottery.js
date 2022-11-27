import React from "react";
import { ethers } from "ethers";
import { contractAbi } from "../utils/constants";
const contractAddress = process.env.REACT_APP_SMART_ADDRESS;

export const TransactionContext = React.createContext("");
const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const lotteryContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return lotteryContract;
};
export default getEthereumContract;
