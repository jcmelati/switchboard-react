import React, { useContext } from 'react';
import {
  IAM,
  WalletProvider,
} from 'iam-client-lib';
import {
  providers,
  Signer,
} from 'ethers';

interface IIamContext {
  connecting: boolean;
  connected: boolean,
  did: string | undefined,
  signer: providers.JsonRpcSigner | Signer | undefined,
  init: (walletProvider: WalletProvider) => Promise<void>
  logout: () => Promise<void>
}

const iamContext = React.createContext({} as IIamContext);

const iam = new IAM();

function useProvideIam() {
  const [connecting, setConnecting] = React.useState<boolean>(false);
  const [connected, setConnected] = React.useState<boolean>(false);
  const [did, setDid] = React.useState<string | undefined>();
  const [signer, setSigner] = React.useState<providers.JsonRpcSigner | Signer | undefined>();

  async function init(walletProvider: WalletProvider) {
    setConnecting(true);
    try {
      const initializationData = await iam.initializeConnection({
        walletProvider,
        reinitializeMetamask: true,
        initCacheServer: true,
        createDocument: false,
      });

      setConnected(initializationData.connected);
      setConnecting(false);
      setDid(initializationData.did);
      setSigner(iam.getSigner());
    } catch (e: unknown) {
      setConnecting(false);
    }
  }

  async function logout() {
    setConnected(false);
    await iam.closeConnection();
  }

  return {
    connecting,
    connected,
    did,
    signer,
    init,
    logout,
  };
}

// Provider component
export const ProvideIam = ({ children }: { children: React.ReactNode }) : JSX.Element => {
  const iamProvider = useProvideIam();
  return <iamContext.Provider value={iamProvider}>{children}</iamContext.Provider>;
};

// Hook for child components
export const ConsumeIam = () : IIamContext => useContext(iamContext);
