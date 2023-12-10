import React, { useState, useEffect } from "react";
const ethers = require("ethers")
import { Input, Popover, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import tokensList from "../utils/tokensList.json";
import { useAccount, useSendTransaction, useWaitForTransaction } from "wagmi";
import axios from "axios";
import { parseEther } from "viem";
// import { BrowserProvider, ethers } from "ethers";
import inchAbi from "../utils/1inchAbi.json";

function Swap() {
  const { address, isConnected } = useAccount();
  const [tokenOne, setTokenOne] = useState(tokensList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokensList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [tokenNumber, setTokenNumber] = useState(1);
  const [messageApi, contextHolder] = message.useMessage(); // for showing successful messages
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = useState("");
  const [prices, setPrices] = useState({
    tokenOne: 0,
    tokenTwo: 0,
    ratio: 0,
  });
  const [txDetails, setTxDetails] = useState({
    to: "",
    data: "",
    value: "",
  });

  //Handles falicitation of transaction for approvals
  const { data, sendTransaction } = useSendTransaction({
    account: address,
    to: String(txDetails.to),
    data: txDetails.data as `0x${string}`,
    value: parseEther(txDetails.value),
  });

  //Handles fetching of transaction hash
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Handles changing data
  function changeAmount(e: any) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((Number(e.target.value) * prices.ratio).toFixed(6));
    } else {
      setTokenTwoAmount("");
    }
  }

  // Handles changing the two token inputs
  function modifyToken(i: number) {
    setPrices({
      tokenOne: 0,
      tokenTwo: 0,
      ratio: 0,
    });
    setTokenOneAmount("");
    setTokenTwoAmount("");
    if (tokenNumber === 1) {
      setTokenOne(tokensList[i]);
      fetchPrices(tokensList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokensList[i]);
      fetchPrices(tokenOne.address, tokensList[i].address);
    }
    setIsOpen(false);
  }

  // Handles open tokens modal
  function openModal(toOpen: number) {
    setTokenNumber(toOpen);
    setIsOpen(true);
  }

  // handles swapping tokens from input
  function changeTokenSet() {
    setPrices({
      tokenOne: 0,
      tokenTwo: 0,
      ratio: 0,
    });
    setTokenOneAmount("");
    setTokenTwoAmount("");
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  }

  // Handles Fetching of prices using moralis api
  // Note:- We can use quote api of 1inch or use other coingecko api as well
  async function fetchPrices(one: any, two: any) {
    console.log("yes printed");
    const res = await axios.get(`http://localhost:3001/api/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });
    setPrices(res.data);
  }

  // Handles falicitation of swaping function from 1inch contract
  const initiateContract = async (data: any) => {
    try {
      const providerr = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await providerr.getSigner();
      const contractAddress = "0x1111111254EEB25477B68fb85Ed929f73A960582";

      // instance of contract
      const inchContract = new ethers.Contract(
        contractAddress,
        inchAbi.abi,
        signer
      );

      const tx = await inchContract.swap(data);

      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  // Handles fetching of Approve, Allowance and Swap API
  async function fetchDexSwap() {
    const allowanceBody = {
      params: {
        tokenAddress: tokenOne.address,
        walletAddress: address,
      },
    };
    const apiUrl = "http://localhost:3001/api/swap/allowance";

    const allowance = await axios.get(apiUrl, allowanceBody);

    if (allowance.data.allowance === "0") {
      // to avoid 429 error -- multiple requests
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const approveBody = {
        params: { tokenAddress: tokenOne.address },
      };
      const apiUrl = "http://localhost:3001/api/swap/approve";

      const approve = await axios.get(apiUrl, approveBody);

      setTxDetails(approve.data);

      return;
    }

    const swapBody = {
      params: {
        fromTokenAddress: tokenOne.address,
        toTokenAddress: tokenTwo.address,
        amount: tokenOneAmount.padEnd(
          tokenOne.decimals + tokenOneAmount.length,
          "0"
        ),
        fromAddress: address,
      },
    };

    const swapUrl = "http://localhost:3001/api/swap/";

    const tx = await axios.get(swapUrl, swapBody);

    console.log(tx);

    let decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

    // Swap function from 1inch API
    await initiateContract(tx.data.tx);
  }

  useEffect(() => {
    fetchPrices(tokensList[0].address, tokensList[1].address);
  }, []);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

  //Handles fetching of prices every 15sec.
  // Note:- We can use react query to handle this gracefully
  useEffect(() => {
    const timer = setInterval(
      () => fetchPrices(tokenOne.address, tokenTwo.address),
      15000
    ); // 15 seconds in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log(prices.ratio);
    setTokenTwoAmount((Number(tokenOneAmount) * prices.ratio).toFixed(6));
  }, [prices]);

  // ----Handles successful and loading messages----

  // useEffect(() => {
  //   messageApi.destroy();

  //   if (isLoading) {
  //     messageApi.open({
  //       type: "loading",
  //       content: "Transaction is Pending...",
  //       duration: 0,
  //     });
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  //   messageApi.destroy();
  //   if (isSuccess) {
  //     messageApi.open({
  //       type: "success",
  //       content: "Transaction Successful",
  //       duration: 1.5,
  //     });
  //   } else if (txDetails.to) {
  //     messageApi.open({
  //       type: "error",
  //       content: "Transaction Failed",
  //       duration: 1.5,
  //     });
  //   }
  // }, [isSuccess]);

  return (
    <div className=" h-[80vh] flex justify-center items-center">
      <div className="h-[65vh] w-[65vh] bg-white rounded-[35px]">
        <Modal
          open={isOpen}
          footer={null}
          onCancel={() => setIsOpen(false)}
          title="Select a token"
        >
          <div className="mt-5 flex flex-col overflow-y-scroll h-[70vh]">
            {tokensList?.map((e, i) => {
              return (
                <div
                  className="flex justify-start items-center pl-5 pt-2 pb-2 hover:cursor-pointer hover:bg-gray-900 hover:text-white hover:rounded-3xl "
                  key={i}
                  onClick={() => modifyToken(i)}
                >
                  <img src={e.img} alt={e.ticker} className="h-12 w-12" />
                  <div className="!hover:text-white">
                    <div className="ml-2 text-base text-[1.2rem] font-medium">
                      {e.name}
                    </div>
                    <div className="ml-2 text-xs text-[1.1rem] font-light ">
                      {e.ticker}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
        <div className=" flex flex-col justify-start pl-8 pr-8 min-h-[300px] rounded-[15px] h-full w-full items-center">
          <div className="flex justify-between items-center w-[98%] mt-4 ">
            <h3 className="text-[25px] text-gray-700 font-[700] ">Swap</h3>
            <div className="flex w-[30%] justify-evenly">
              <RedoOutlined className="text-gray-700  hover:cursor-pointer text-[30px] ml-2" />
              <PlusOutlined className="text-gray-700  hover:cursor-pointer text-[30px]" />
              <Popover
                content={""}
                title="Settings"
                trigger="click"
                placement="bottomRight"
              >
                <SettingOutlined className="text-gray-700  hover:cursor-pointer text-[30px]" />
              </Popover>
            </div>
          </div>
          <div className="w-full relative">
            <div className="bg-[#f3f5fa] w-full h-[20vh] rounded-2xl mt-3 flex flex-col">
              <div className="text-[18px] text-[#6a6a6a] font-medium p-[15px]">
                You Sell
              </div>
              <div className="flex justify-between items-center mt-5">
                <div
                  className=" h-8  flex justify-start items-center font-bold text-base pr-2 min-w-[50px] rounded-[100px] gap-1 hover:cursor-pointer text-[25px]"
                  onClick={() => openModal(1)}
                >
                  <img
                    src={tokenOne.img}
                    alt="assetOne"
                    className="h-[70px] ml-[5px]"
                  />
                  {tokenOne.ticker}
                  <DownOutlined />
                </div>
                <Input
                  placeholder="0"
                  value={tokenOneAmount}
                  onChange={changeAmount}
                  disabled={!prices}
                  className="min-w-[5vw] w-auto max-w-[10vw] mr-2 border-0 bg-transparent font-semibold text-[25px] "
                />
              </div>
            </div>

            <div className="border-2 border-[[#f3f5fa]] w-full h-[20vh] rounded-2xl mt-3 flex flex-col">
              <div className="text-[18px] text-[#6a6a6a] font-medium p-[15px]">
                You Buy
              </div>

              <div className="flex justify-between items-center mt-5">
                <div
                  className="h-8  flex justify-start items-center font-bold text-base pr-2 min-w-[50px] rounded-[100px] gap-1 hover:cursor-pointer text-[25px]"
                  onClick={() => openModal(2)}
                >
                  <img
                    src={tokenTwo.img}
                    alt="assetLogo"
                    className="h-[70px] ml-[5px]"
                  />
                  {tokenTwo.ticker}
                  <DownOutlined />
                </div>
                <Input
                  placeholder="0"
                  value={tokenTwoAmount}
                  disabled={true}
                  className="min-w-[5vw] border-transparent bg-transparent font-semibold text-[25px] mr-2 w-auto max-w-[10vw]"
                />
              </div>
            </div>

            <div
              className=" w-6 h-6 items-center justify-center flex absolute text-[30px] top-[48%] left-[46%] hover:cursor-pointer text-blue-700 shadow-lg border-[2px] border-[#bfbfbf] rounded-full !p-[15px] bg-white"
              onClick={changeTokenSet}
            >
              <ArrowDownOutlined className="hover:rotate-180 transition ease-in-out" />
            </div>
          </div>
          <div
            className="flex justify-center items-center bg-gray-800 h-12 text-xl text-indigo-500 font-bold mb-8 w-full rounded-[12px] hover:cursor-pointer hover:bg-indigo-900 mt-5"
            // disabled={!tokenOneAmount || !isConnected}
            onClick={fetchDexSwap}
          >
            Swap
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;