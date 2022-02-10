import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { ModalCloseButton, ModalHeader, ModalTitle, ModalContent } from '../Modal/Modal';

export interface WaitingApprovalProps {
  message: string;
  onDismiss?: () => void;
}

const WaitingApproval: React.FC<WaitingApprovalProps> = ({ message, onDismiss }) => {
  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Waiting For Confirmation</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <ModalContent>
        <StyledMessage>{message}</StyledMessage>
        <StyledHelper>Confirm this transaction in your wallet</StyledHelper>
      </ModalContent>
    </Modal>
  );
};

const StyledMessage = styled.div`
  text-align: center;
`;

const StyledHelper = styled.div`
  margin-top: 10px;
  text-align: center;
`;

export default WaitingApproval;
