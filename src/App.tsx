import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state';
import Updaters from './state/Updaters';
import Modals from './providers/Modals';
import loadable from '@loadable/component';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { AccountBalanceProvider } from './providers/AccountBalanceProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLibrary = (p: any) => {
  return new Web3Provider(p);
};

const Vaults = loadable(() => import('./views/Vaults'));
const CreateVault = loadable(() => import('./views/CreateVault'));

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <AccountBalanceProvider>
            <Updaters />
            <Modals>
              <BrowserRouter>
                <Route path="/" exact>
                  <Vaults />
                </Route>
                <Route path="/create" exact>
                  <CreateVault />
                </Route>
              </BrowserRouter>
            </Modals>
          </AccountBalanceProvider>
        </Provider>
      </Web3ReactProvider>
    </ThemeProvider>
  );
};
