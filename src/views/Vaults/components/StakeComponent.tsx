import React, { useCallback, useMemo, useRef, useState } from 'react';
import Number from '../../../components/Number';
import { BigNumber } from '@ethersproject/bignumber';
import styled from 'styled-components';
import { TemplateConfig } from '../../../models/Template';
import { useToken } from '../../../hooks/useToken';
import { useVaultMaster } from '../../../hooks/useVaultMaster';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useHandleTransactionReceipt from '../../../hooks/useHandleTransactionReceipt';
import { useTokenBalance } from '../../../providers/AccountBalanceProvider';
import TokenSliderInput from './TokenSliderInput';
import { getDisplayNumber } from '../../../utils/formatBN';
import { Button } from '../../../components/Buttons/Button';

interface StakeComponentProps {
  vault: string;
  vaultMaster: string;
  template: TemplateConfig;
}

const StakeComponent: React.FC<StakeComponentProps> = ({ vault, vaultMaster, template }) => {
  const { token0, token1 } = template;
  const wantToken = useToken(template?.wantToken);
  const { deposit } = useVaultMaster(vaultMaster);
  const [approvalState, approve] = useApprove(wantToken?.address, vaultMaster);
  const [staking, setStaking] = useState(false);
  const [amount, setAmount] = useState(BigNumber.from(0));
  const balance = useTokenBalance(wantToken?.address);
  const handleReceipt = useHandleTransactionReceipt();
  const refInput = useRef(null);

  const hasInputError = useMemo(() => {
    if (!amount || !balance) {
      return false;
    }
    if (amount.lt(BigNumber.from(0)) || amount.gt(balance)) {
      return true;
    }
    return false;
  }, [amount, balance]);

  const isExceededBalance = useMemo(() => {
    if (amount && balance) {
      return amount.gt(balance);
    }
    return false;
  }, [amount, balance]);

  const getText = useMemo(() => {
    if (approvalState === ApprovalState.NOT_APPROVED) {
      return `Approve`;
    } else if (approvalState === ApprovalState.PENDING) {
      return `Approving...`;
    } else if (isExceededBalance) {
      return `Insufficient balance`;
    } else if (staking) {
      return `Deposit...`;
    } else {
      return `Deposit`;
    }
  }, [isExceededBalance, approvalState, staking]);

  const disabled = useMemo(() => {
    if (approvalState === ApprovalState.NOT_APPROVED) {
      return false;
    }
    return (
      !amount ||
      amount.eq(BigNumber.from(0)) ||
      hasInputError ||
      staking ||
      approvalState === ApprovalState.PENDING ||
      isExceededBalance
    );
  }, [approvalState, amount, hasInputError, staking, isExceededBalance]);

  const stake = useCallback(async () => {
    if (!deposit) return;
    const tx = await handleReceipt(
      deposit(vault, amount),
      `Deposit ${getDisplayNumber(
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
  }, [amount, deposit, handleReceipt, vault, wantToken?.decimals, wantToken?.symbol]);

  const onClick = useCallback(async () => {
    if (approvalState !== ApprovalState.APPROVED) {
      await approve();
    } else {
      setStaking(true);
      try {
        await stake();
        setStaking(false);
      } catch {
        setStaking(false);
      }
    }
  }, [approvalState, approve, stake]);

  const onClickBalance = useCallback(() => {
    refInput?.current?.onMax();
  }, [refInput]);

  return (
    <StyledContainer>
      <Balance>
        Balance:&nbsp;
        <span className="balance-click" onClick={onClickBalance}>
          <Number value={balance} decimals={18} precision={6} />
        </span>
        &nbsp; {token0}
        {token1 ? '/' + token1 : ''}
      </Balance>
      <TokenSliderInput
        ref={refInput}
        hasError={false}
        token={wantToken?.address}
        decimals={wantToken?.decimals}
        precision={wantToken?.decimals || 6}
        onChange={setAmount}
        token0={token0}
        token1={token1}
      />
      <div className="footer">
        <Button disabled={disabled} error={isExceededBalance} onClick={onClick}>
          {getText}
        </Button>
      </div>
    </StyledContainer>
  );
};

export default StakeComponent;

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
