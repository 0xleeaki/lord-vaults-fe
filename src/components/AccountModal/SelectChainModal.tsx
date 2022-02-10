import React from 'react';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalProps,
  ModalTitle,
  ModalContent,
} from '../Modal/Modal';
import { ChainId, NETWORK, NETWORK_LABEL } from '../../utils/constants';
import { useWeb3React } from '@web3-react/core';
import { ButtonLink } from '../Buttons/ButtonLink';
import styled from 'styled-components';

const SelectChainModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { chainId, library, account } = useWeb3React();

  if (!chainId) return null;

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Select network</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <ModalContent>
        {[ChainId.POLYGON, ChainId.BSC].map((key: ChainId, i: number) => (
          <StyledItem key={i}>
            <ButtonLink
              onClick={() => {
                const params = NETWORK[key];
                library?.send('wallet_addEthereumChain', [params, account]);
                onDismiss();
              }}
            >
              {NETWORK_LABEL[key]}
            </ButtonLink>
            {key === chainId && <i className="fas fa-check" />}
          </StyledItem>
        ))}
      </ModalContent>
    </Modal>
  );
};

const StyledItem = styled.div`
  i {
    color: #94febf;
    font-size: 12px;
    margin-left: 10px;
  }
`;

export default SelectChainModal;
