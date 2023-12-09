"use client";

import Link from "next/link";

// import WalletIcon from "../public/icons/WalletIcon";

import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "../lib/utils";

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    console.log(account)
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
    console.log(account)
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
    console.log(account)
  };

  return (
    <div className="relative">
      {connected ? (
        <div className="flex">
            <button>{formatAddress(account)}</button>
            <button
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </button>
        </div>
            

      ) : (
        <button disabled={connecting} onClick={connect}>
        Connect Wallet
        </button>
      )}
    </div>
  );
};