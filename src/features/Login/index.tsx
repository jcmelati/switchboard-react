import React from 'react';
import {
  WalletProvider,
} from 'iam-client-lib';

import { ConsumeIam } from '../../hooks/iam.context';

const Login = () : JSX.Element => {
  const iamContext = ConsumeIam();

  return (
    <>
      <h2>Home</h2>
      <button type="button" onClick={() => { iamContext.init(WalletProvider.MetaMask); }}>MetaMask</button>
      <button type="button" onClick={() => { iamContext.init(WalletProvider.WalletConnect); }}>WalletConnect</button>

      {iamContext.connecting && <><p>connecting...</p></>}
      {iamContext.connected && <><p>connected!</p></>}
      {!iamContext.connected && !iamContext.connecting && <><p>disconnected</p></>}
    </>
  );
};

export default Login;
