import { ethers } from "ethers";
import axios, { AxiosInstance } from "axios";
import "dotenv/config";

import { IAssetData, IGasPrices, IParsedTx } from "./types";

const api: AxiosInstance = axios.create({
  baseURL: "https://ethereum-api.xyz",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getProvider = async (chainId: number): Promise<any> => {
  let rpc = "";
  const infuraApiKey = process.env.REACT_APP_INFURA_API_KEY;

  switch (chainId) {
    case 1: // ethereum mainnet
      rpc = `https://mainnet.infura.io/v3/${infuraApiKey}`;
      break;
    case 5: // ethereum testnet
      rpc = `https://goerli.infura.io/v3/${infuraApiKey}`;
      break;
    case 80001: // polygon testnet (mumbai)
      // rpc = "polygon-mumbai";
      rpc = "https://polygon-mumbai.g.alchemy.com/v2/-R_LQlWBHp3wDfbx_Ca2p60mj1OfNgUI";
      break;
    case 137: // polygon mainet (mumbai)
      // rpc = "polygon-mainnet";
      rpc = "https://polygon-mainnet.g.alchemy.com/v2/yijq8aCcnsRKfPk41qixRZW66Y4zDq-d";
      break;
    default:
      rpc = `https://mainnet.infura.io/v3/${infuraApiKey}`;
  }
  const infuraUrl = rpc;

  const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
  return { provider };
};

export const Nonce = async (chainId: number, address: string): Promise<any> => {
  const { provider } = await getProvider(chainId);
  const nonce = await provider.getTransactionCount(address);
  return nonce;
};

export const getBalance = async (address: string, chainId: number): Promise<any> => {
  const { provider } = await getProvider(chainId);

  await provider.getBalance(address).then((balance: any) => {
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  });
};

export async function apiGetAccountAssets(address: string, chainId: number): Promise<IAssetData[]> {
  const response = await api.get(`/account-assets?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number,
): Promise<IParsedTx[]> {
  const response = await api.get(`/account-transactions?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}

export const apiGetAccountNonce = async (address: string, chainId: number): Promise<string> => {
  return await Nonce(chainId, address);

  //   const response = await api.get(`/account-nonce?address=${address}&chainId=${chainId}`);
  //   const { result } = response.data;
  //   return result;
};

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const response = await api.get(`/gas-prices`);
  const { result } = response.data;
  return result;
};
