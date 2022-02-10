import React from 'react';
import styled from 'styled-components';
import { config } from '../../config';
import { useChainId } from '../../hooks/useChainId';
import { Button } from '../Buttons/Button';
import { Link } from '../Buttons/Link';
import Modal from '../Modal';
import { ModalCloseButton, ModalHeader, ModalTitle } from '../Modal/Modal';

export interface WaitingApprovalResultProps {
  onDismiss?: () => void;
  transactionHash: string;
}

const WaitingApprovalResult: React.FC<WaitingApprovalResultProps> = ({
  transactionHash,
  onDismiss,
}) => {
  const chainId = useChainId();

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Transaction Submitted</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <StyledContent>
        <Link
          href={`${config.network.explorerLink[chainId]}/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Explorer&nbsp;
          <i className="far fa-external-link" />
        </Link>
        <Button className="btn" onClick={onDismiss}>
          Close
        </Button>
      </StyledContent>
    </Modal>
  );
};

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  .btn {
    width: 100%;
    margin-top: 20px;
  }
`;

export default WaitingApprovalResult;
