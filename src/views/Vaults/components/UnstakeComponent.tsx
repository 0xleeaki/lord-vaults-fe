import React, { useCallback, useMemo, useRef, useState } from 'react';
import Number from '../../../components/Number';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import { TemplateConfig } from '../../../models/Template';
import { useToken } from '../../../hooks/useToken';
import useHandleTransactionReceipt from '../../../hooks/useHandleTransactionReceipt';
import { useVaultMaster } from '../../../hooks/useVaultMaster';
import { getDisplayNumber } from '../../../utils/formatBN';
import TokenSliderInput from './TokenSliderInput';
import { Button } from '../../../components/Buttons/Button';
import Spacer from '../../../components/Spacer';

interface UnstakeComponentProps {
  vault: string;
  vaultMaster: string;
  template: TemplateConfig;
  balanceInFarm: BigNumber;
}

const UnstakeComponent: React.FC<UnstakeComponentProps> = ({
  vault,
  vaultMaster,
  template,
  balanceInFarm,
}) => {
  const { token0, token1 } = template;
  const wantToken = useToken(template?.wantToken);
  const { withdraw, exit } = useVaultMaster(vaultMaster);
  const [unStaking, setUnStaking] = useState(false);
  const [unStakingAll, setUnStakingAll] = useState(false);
  const [amount, setAmount] = useState(BigNumber.from(0));
  const handleTransaction = useHandleTransactionReceipt();
  const refInput = useRef(null);

  const hasInputError = useMemo(() => {
    if (!amount || !balanceInFarm) {
      return false;
    }
    if (amount.lt(BigNumber.from(0)) || amount.gt(balanceInFarm)) {
      return true;
    }
    return false;
  }, [amount, balanceInFarm]);

  const isExceededBalance = useMemo(() => {
    if (amount && balanceInFarm) {
      return amount.gt(balanceInFarm);
    }
    return false;
  }, [amount, balanceInFarm]);

  const disabled = useMemo(() => {
    return (
      !amount ||
      amount.eq(BigNumber.from(0)) ||
      hasInputError ||
      unStaking ||
      balanceInFarm?.eq(BigNumber.from(0)) ||
      isExceededBalance
    );
  }, [amount, hasInputError, unStaking, balanceInFarm, isExceededBalance]);

  const getText = useMemo(() => {
    if (isExceededBalance) {
      return `Insufficient balance`;
    } else if (unStaking) {
      return `Withdraw...`;
    } else {
      return `Withdraw`;
    }
  }, [isExceededBalance, unStaking]);

  const getUnStakeAllText = useMemo(() => {
    if (unStakingAll) {
      return `Withdraw All...`;
    } else {
      return `Withdraw All`;
    }
  }, [unStakingAll]);

  const unstake = useCallback(async () => {
    if (!withdraw) return;
    const tx = await handleTransaction(
      withdraw(vault, amount),
      `Withdraw ${getDisplayNumber(
        amount,
        wantToken?.decimals,
        6,
        false,
        false,
        false,
        false,
      )}  ${wantToken?.symbol}`,
    );
    if (tx) {
      await tx.wait();
      refInput?.current?.resetInput(undefined);
      setAmount(BigNumber.from(0));
    }
  }, [withdraw, handleTransaction, vault, amount, wantToken?.decimals, wantToken?.symbol]);

  const onUnstakeAll = useCallback(async () => {
    const tx = await handleTransaction(exit(vault), `Withdraw all ${wantToken?.symbol}`);
    if (tx) {
      await tx.wait();
      refInput?.current?.resetInput(undefined);
      setAmount(BigNumber.from(0));
    }
  }, [exit, handleTransaction, vault, wantToken?.symbol]);

  const onClick = useCallback(async () => {
    setUnStaking(true);
    try {
      await unstake();
      setUnStaking(false);
    } catch {
      setUnStaking(false);
    }
  }, [unstake]);

  const onClickUnStakeAll = useCallback(async () => {
    setUnStakingAll(true);
    try {
      await onUnstakeAll();
      setUnStakingAll(false);
    } catch {
      setUnStakingAll(false);
    }
  }, [onUnstakeAll]);

  const onClickBalance = useCallback(() => {
    refInput?.current?.onMax();
  }, [refInput]);

  return (
    <StyledContainer>
      <Balance>
        Deposited:&nbsp;
        <span className="balance-click" onClick={onClickBalance}>
          <Number value={balanceInFarm} decimals={18} precision={6} />
        </span>
        &nbsp; {token0}
        {token1 ? '/' + token1 : ''}
      </Balance>
      <TokenSliderInput
        ref={refInput}
        hasError={false}
        token={wantToken?.address}
        maxBalance={balanceInFarm}
        decimals={wantToken?.decimals}
        precision={wantToken?.decimals || 6}
        onChange={setAmount}
        token0={token0}
        token1={token1}
      />
      <div className="footer">
        {' '}
        <Button disabled={disabled} error={isExceededBalance} onClick={onClick}>
          {getText}
        </Button>
        <Spacer />
        <Button
          disabled={!balanceInFarm || balanceInFarm?.eq(BigNumber.from(0))}
          onClick={onClickUnStakeAll}
        >
          {getUnStakeAllText}
        </Button>
      </div>
    </StyledContainer>
  );
};

export default UnstakeComponent;

const StyledContainer = styled.div`
  .footer {
    display: flex;
    justify-content: center;
  }
`;

const Balance = styled.div`
  margin-bottom: 10px;
  .balance-click {
    color: #94febf;
    cursor: pointer;
  }
`;
