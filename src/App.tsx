import React from 'react';
import Routes from './routes';
import Providers from './providers';

export default function App(): JSX.Element {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}
