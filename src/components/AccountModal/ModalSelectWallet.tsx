import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { config, supportedChainIds } from '../../config';
import { WalletConnectConnector } from '../../libs/WalletConnectConnector';
import { useAddPopup, useSetConnectedAccount } from '../../state/application/hooks';
import { ButtonLink } from '../Buttons/ButtonLink';
import Modal, { ModalCloseButton, ModalHeader, ModalTitle } from '../Modal/Modal';

export type ModalSelectWalletProps = {
  onDismiss?: () => void;
};

const connectors = {
  injected: new InjectedConnector({
    supportedChainIds,
  }),
  walletconnect: new WalletConnectConnector({
    supportedChainIds,
    rpc: config.network.rpcUrls,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
  }),
  default: new NetworkConnector({
    urls: config.network.rpcUrls,
    defaultChainId: config.network.defaultChainId,
  }),
};

export const ModalSelectWallet: React.FC<ModalSelectWalletProps> = ({ onDismiss }) => {
  const isConnecting = useRef<boolean>();
  const { account, activate } = useWeb3React();
  const setAccount = useSetConnectedAccount();
  const addPopup = useAddPopup();

  useEffect(() => {
    if (isConnecting.current && account) {
      setAccount(account);
      isConnecting.current = false;
    }
  }, [account, setAccount]);

  const connect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (connector: any) => {
      isConnecting.current = true;
      activate(connector, (e) => {
        isConnecting.current = false;
        if (e instanceof UnsupportedChainIdError) {
          addPopup({
            error: {
              title: 'Unsupported chain ID',
              message: e.message,
            },
          });
        }
      }).then(onDismiss);
    },
    [activate, addPopup, onDismiss],
  );

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Connect your wallet</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <StyledChainContainer>
        <div className="btn">
          {' '}
          <ButtonLink onClick={() => connect(connectors.injected)}>Browser wallet</ButtonLink>
        </div>
        <div className="btn">
          <ButtonLink onClick={() => connect(connectors.walletconnect)}>
            Wallet connect
          </ButtonLink>
        </div>
      </StyledChainContainer>
    </Modal>
  );
};

const StyledChainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  .btn {
    margin: 0px 10px;
  }
`;
