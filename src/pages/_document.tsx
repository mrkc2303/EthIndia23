import { Html, Head, Main, NextScript } from 'next/document'
import { MetaMaskProvider } from '@metamask/sdk-react';

export default function Document() {
  const host =
  typeof window !== "undefined" ? window.location.host : "defaultHost";
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };

  return (
    <Html lang="en">
      <Head />
      <body>
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <Main />
          <NextScript />
        </MetaMaskProvider>
      </body>
    </Html>
  )
}
