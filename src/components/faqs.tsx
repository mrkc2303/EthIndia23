'use client'
import React from 'react'
import {AiOutlineDown} from 'react-icons/ai'


const FAQAccordian = (props:any) => {
    const [show, setShow] = React.useState(false)
    function handleHidden(){
        if(show){
            
        }
    }

    return(
        <div className='px-3 border-b overflow-hidden border-neutral-500 my-10 pb-5 ' onClick={()=>setShow(!show)}>
            <div className='flex justify-between gap-5 hover:cursor-pointer'>
                <h3 className='font-primary font-bold text-lg md:text-2xl'>{props.question}</h3>
                <button>
                    {!show ? <AiOutlineDown className='text-[#01C3F1] transform rotate-0 duration-300' /> : <AiOutlineDown className='text-[#01C3F1] transform rotate-180 duration-300' />}
                </button>
            </div>
            <div className={`py-3 ${show ? " transform translate-y-0 duration-300" : " transform  -translate-y-6 duration-300"}`}>
                <p className={`px-2 font-secondary text-[#a7a7a7] text-xs md:text-base ${show ? "" : "HiddenFAQ"} `}>{props.answer}</p>
            </div>
        </div>
    )
}

export default function faqs() {
    const faq= [
        {
          id: 1,
          question: "What is dynamic AMM?",
          answer: "Dynamic AMM on Dextr enables LPs to lock a single token while becoming LPs for multiple pairs automatically. Let's illustrate with an example: An LP locks ETH and designates BTC, BNB, DAI, and USDT as permissible tokens. Initially, their liquidity serves ETH pairs like ETH/BTC, ETH/BNB, ETH/DAI, and ETH/USDT. Now, when a swap occurs, say in the ETH/BTC pair, the dynamic AMM automatically utilizes the LP's BTC to facilitate trades in BTC pairs like BTC/ETH, BTC/BNB, BTC/DAI, and BTC/USDT. This dynamic use of the LP's assets ensures they become LPs for all permissible pairs without requiring separate investments, optimizing earning potential and providing access to multiple markets in a seamless manner."
        },
        {
          id: 2,
          question: "How does Dextr ensure 'Best Price Discovery'?",
          answer: "Dextr automatically sources the lowest price option for buy orders or the highest price option for sell orders from either the orderbook or the dynamic AMM. By doing so, Dextr guarantees that traders get the most favorable prices available at the time of placing their orders, optimizing their trading experience and potential returns."
        },
        {
          id: 3,
          question: "How does Dextr enable bridgeless cross-chain swaps?",
          answer: "Dextr achieves bridgeless cross-chain swaps through a cross-chain communication protocol, allowing seamless trade settlement without the need for traditional bridges, even if users hold SBTs on different chains."
        },
        {
          id: 4,
          question: "How do I recover access to my funds in case I lose the private keys of my EOA?",
          answer: "You can set up a social recovery group on Dextr. If you lose access to your EOA (Externally Owned Account), your appointed guardians via on-chain vote will verify your identity, based on which your membership SBT stored in your old EOA will get burnt and minted in the EOA approved by guardians. This will effectively enable you to access your Dextr Account through your new EOA."
        },
        {
          id: 5,
          question: "Where are my assets stored while I trade on Dextr?",
          answer: "If you have opted for Liquid Staking (only for POS assets), your assets are securely held with the validator of your choice. Otherwise, your funds are locked in a smart contract that permits withdrawals solely based on the balances reflected in your SBTs."
        },
        {
          id: 6,
          question: "How can I trade crypto on Dextr?",
          answer: "To trade crypto on Dextr, simply deposit funds into your Dextr account using any supported EOA (Externally Owned Account). Once you have deposited funds, you can start trading across multiple chains, including Ethereum, Polygon, Arbitrum, etc."
        },
        {
          id: 7,
          question: "How are my funds protected in case of theft of Private Keys?",
          answer: "At Dextr, your funds are safeguarded through an SBT-based authentication method. Users can whitelist one or more EOAs (Externally Owned Accounts) to act as co-signatories for a withdrawal request. A withdrawal is executed only after successful confirmation is received from all SBT whitelisted wallets."
        },
        {
          id: 8,
          question: "How am I protected from MEV exploits?",
          answer: "Dextr implements gas abstraction to ensure uniform gas fee payment for all user orders. When you place an order, the gas you pay goes to the gas tank, and through gas abstraction, the paymaster pays the transaction fee. This approach removes the incentive for transaction prioritization based on high gas fees, providing protection against MEV (Miner Extractable Value) exploits and front running."
        },
        {
          id: 9,
          question: "How does Dextr's succession planning process work?",
          answer: "Through Soulbound Tokens (SBTs), you can appoint nominees and will executors. In the event of a mishap, your nominees can request a fund transfer to their SBT whitelisted EOA. The transfer is executed upon an on-chain vote provenance by the will executors, ensuring a secure and transparent process."
        },
        {
          id: 10,
          question: "What are DXTR tokens and how are they useful to me?",
          answer: "DXTR is an ERC20 token with multiple use cases within the Dextr ecosystem:\n\n- Discounts on trading fee: Traders will receive a discount on the trading fee (0.3%) when they choose to pay the fee in DXTR tokens.\n- For ascertaining the ranking of LPs in the dynamic AMM\n- Holding Dextr tokens also boosts your REP balance."
        },
        {
          id: 11,
          question: "What is a REP Balance and why is it important?",
          answer: "REP is your reputation score within Dextr, based on 24hr trading, liquidity volume, and DXTR holdings. Higher REP also boosts LPs' dynamic AMM ranking and provides both LPs and Traders with increased rewards and voting rights."
        },
        {
          id: 12,
          question: "How does Dextr compare to other non-custodial exchanges?",
          answer: "Other non-custodial exchanges limit LPs earning potential, rely on bridges for cross-chain swaps, lack robust fund recovery mechanisms, and face governance vulnerabilities. Dextr excels with dynamic AMM, bridgeless swaps, social recovery, and reputation-based governance, providing a superior decentralized exchange experience."
        },
        {
          id: 13,
          question: "How can Dextr serve as a better alternative to centralized exchanges?",
          answer: "In a fully decentralized manner, Dextr provides users with the same level of convenience as centralized exchanges (CEXs), including features like account recovery, multi-factor authentication (MFA), advanced order options, and copy trading."
        }
      ]
      
      
  return (
    <div className='px-3 md:px-20 my-12 xl:my-20'>
        <h1 className='text-center font-primary text-2xl font-bold xl:text-4xl'>
            FAQs
        </h1>
        <div>
            {faq.map((item) => (    
                <FAQAccordian key={item.id} question={item.question} answer={item.answer} />
            ))}
        </div>
    </div>
  )
}
