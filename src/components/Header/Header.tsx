import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { config, supportedChainIds } from '../../config';
import useModal from '../../hooks/useModal';
import useShortenAddress from '../../hooks/useShortenAddress';
import { useGetConnectedAccount } from '../../state/application/hooks';
import { useAllTransactions } from '../../state/transactions/hooks';
import { ChainId, NETWORK_LABEL } from '../../utils/constants';
import AccountModal from '../AccountModal/AccountModal';
import SelectChainModal from '../AccountModal/SelectChainModal';
import { Button } from '../Buttons/Button';
import ButtonConnect from '../Buttons/ButtonConnect';
import Spacer from '../Spacer';

const connectors = {
  injected: new InjectedConnector({
    supportedChainIds,
  }),
  default: new NetworkConnector({
    urls: config.network.rpcUrls,
    defaultChainId: config.network.defaultChainId,
  }),
};

const Header: React.FC = () => {
  const { account, activate, chainId } = useWeb3React<JsonRpcProvider>();
  const savedAccount = useGetConnectedAccount();
  const allTransactions = useAllTransactions();
  const shortenAccount = useShortenAddress(account);
  const [showSwitchChain] = useModal(<SelectChainModal />);
  const [showAccountModal] = useModal(<AccountModal />);

  useEffect(() => {
    if (!savedAccount && !account) {
      activate(connectors.default, (e) => {
        console.error(e);
      });
      return;
    }

    if (savedAccount && !account) {
      activate(connectors.injected, () => {
        return activate(connectors.default);
      }).catch((e) => {
        console.error(e);
      });
    }
  }, [account, activate, savedAccount]);

  const pendingTransactions = useMemo(
    () => Object.values(allTransactions).filter((tx) => !tx.receipt).length,
    [allTransactions],
  );

  return account ? (
    <StyledHeader>
      <Button onClick={showSwitchChain}>{NETWORK_LABEL[chainId as ChainId]}</Button>
      <Spacer />
      {account && (
        <Button onClick={showAccountModal}>
          {pendingTransactions > 0 ? (
            <>
              <span>
                {pendingTransactions} Pending{pendingTransactions > 1 ? 's' : ''}
              </span>
              <i className="far fa-circle-notch fa-spin" style={{ marginLeft: '5px' }}></i>
            </>
          ) : (
            shortenAccount
          )}
        </Button>
      )}
    </StyledHeader>
  ) : (
    <StyledHeader>
      <ButtonConnect />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: 15px;
  display: flex;
  z-index: 3;
  position: relative;
  align-items: center;
  justify-content: flex-end;
`;

export default Header;
