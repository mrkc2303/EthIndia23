import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { useEffect, useState } from 'react';
const { chains, provider } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: '5524d420b29f4f7a8d8d2f582a0d43f7' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Connect',
  projectId: 'connect',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export interface ISpacesComponentProps {
  children: React.ReactNode;
}

export default function App({ Component, pageProps }: AppProps) {
  const [loadWagmi, setLoadWagmi] = useState(false);
  const [pgpPrivateKey, setPgpPrivateKey] = useState<string>('');

  useEffect(() => {
    setLoadWagmi(true);
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider
        session={pageProps.session}
      >
        <Component {...pageProps} />
      </SessionProvider>
      </WagmiConfig>
  );
}
