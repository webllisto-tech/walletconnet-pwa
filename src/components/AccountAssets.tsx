import * as React from "react";
import Column from "./Column";
import AssetRow from "./AssetRow";
import { IAssetData } from "../helpers/types";

const AccountAssets = (props: any) => {
  const { assets, chainId } = props;
  const defaultNativeCurrency: IAssetData =
    chainId === 80001 || chainId === 137
      ? {
          // chainId===100
          // contractAddress: "",
          // symbol: "xDAI",
          // name: "xDAI",
          // decimals: "18",
          // balance: "0",

          balance: "0",
          contractAddress: "",
          decimals: "18",
          name: "Polygon",
          symbol: "MATIC",
        }
      : {
          contractAddress: "",
          name: "Ethereum",
          symbol: "ETH",
          decimals: "18",
          balance: "0",
        };

  let nativeCurrency: IAssetData = defaultNativeCurrency;
  let tokens: IAssetData[] = [];
  if (assets && assets.length) {
    const filteredNativeCurrency = assets.filter((asset: IAssetData) =>
      asset && asset.symbol
        ? asset.symbol.toLowerCase() === nativeCurrency.symbol.toLowerCase()
        : false,
    );
    nativeCurrency =
      filteredNativeCurrency && filteredNativeCurrency.length
        ? filteredNativeCurrency[0]
        : defaultNativeCurrency;
    tokens = assets.filter((asset: IAssetData) =>
      asset && asset.symbol
        ? asset.symbol.toLowerCase() !== nativeCurrency.symbol.toLowerCase()
        : false,
    );
  }

  console.log("<<<<<Token>>>>", tokens);
  return (
    <Column center>
      <AssetRow key={nativeCurrency.name} asset={nativeCurrency} />
      {tokens.map(token => (
        <AssetRow key={token.symbol} asset={token} />
      ))}
    </Column>
  );
};

export default AccountAssets;
