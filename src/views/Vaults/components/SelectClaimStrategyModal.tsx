import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ButtonLink } from '../../../components/Buttons/ButtonLink';
import Modal from '../../../components/Modal';
import {
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '../../../components/Modal/Modal';
import { config } from '../../../config';
import useHandleTransactionReceipt from '../../../hooks/useHandleTransactionReceipt';
import { useVaultMaster } from '../../../hooks/useVaultMaster';

type SelectClaimStrategyModalProps = {
  onDismiss?: () => void;
  tokens: string[];
  vault?: string;
  vaultMaster?: string;
  selected?: string;
};

const SelectClaimStrategyModal: React.FC<SelectClaimStrategyModalProps> = ({
  onDismiss,
  tokens,
  vault,
  vaultMaster,
  selected,
}) => {
  const handleReceipt = useHandleTransactionReceipt();
  const { setClaimStrategy, removeClaimStrategy } = useVaultMaster(vaultMaster);

  const getToken = useCallback((address: string) => {
    return config.tokens.find((t) => t.address === address);
  }, []);

  const onSetClaimStrategy = useCallback(
    (target: string) => {
      if (!setClaimStrategy) return;
      handleReceipt(setClaimStrategy(vault, target), `Set claim strategy`).then(() => {
        onDismiss();
      });
    },
    [handleReceipt, onDismiss, setClaimStrategy, vault],
  );

  const onRemoveClaimStrategy = useCallback(() => {
    if (!removeClaimStrategy) return;
    handleReceipt(removeClaimStrategy(vault), `Remove claim strategy`).then(() => {
      onDismiss();
    });
  }, [handleReceipt, onDismiss, removeClaimStrategy, vault]);

  return (
    <Modal size="xs">
      <ModalHeader>
        <ModalTitle>Select claim strategy</ModalTitle>
        <ModalCloseButton onClick={onDismiss} />
      </ModalHeader>
      <ModalContent>
        {tokens.map((address: string, i: number) => (
          <StyledItem key={i}>
            <ButtonLink
              disabled={address === selected}
              onClick={() => onSetClaimStrategy(address)}
            >
              {getToken(address)?.symbol}
            </ButtonLink>

            {address === selected && <i className="fas fa-check" />}
            {address === selected && (
              <ButtonLink onClick={onRemoveClaimStrategy}>remove</ButtonLink>
            )}
          </StyledItem>
        ))}
      </ModalContent>
    </Modal>
  );
};

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0px;
  i {
    color: #94febf;
    font-size: 12px;
    margin-left: 10px;
    margin-right: auto;
  }
`;

export default SelectClaimStrategyModal;
