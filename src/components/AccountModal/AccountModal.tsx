import React, { useCallback } from 'react';
import Modal, {
  ModalCloseButton,
  ModalHeader,
  ModalProps,
  ModalTitle,
  ModalContent,
} from '../Modal/Modal';
import { useWeb3React } from '@web3-react/core';
import { ButtonLink } from '../Buttons/ButtonLink';
import { useDisconnectAccount } from '../../state/application/hooks';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, deactivate } = useWeb3React();
  const disconnectAccount = useDisconnectAccount();

  const disconnect = useCallback(() => {
    deactivate();
    disconnectAccount();
    onDismiss();
  }, [deactivate, disconnectAccount, onDismiss]);

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Connected</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <ModalContent>
        {account}
        <ButtonLink onClick={disconnect}>Disconnect</ButtonLink>
      </ModalContent>
    </Modal>
  );
};

export default AccountModal;
