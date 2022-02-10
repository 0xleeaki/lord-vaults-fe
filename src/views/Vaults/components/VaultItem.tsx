import { BigNumber } from '@ethersproject/bignumber';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Buttons/Button';
import { Link } from '../../../components/Buttons/Link';
import Spacer from '../../../components/Spacer';
import { config } from '../../../config';
import { useChainId } from '../../../hooks/useChainId';
import useHandleTransactionReceipt from '../../../hooks/useHandleTransactionReceipt';
import useModal from '../../../hooks/useModal';
import useShortenAddress from '../../../hooks/useShortenAddress';
import { useToken } from '../../../hooks/useToken';
import { useVaultMaster } from '../../../hooks/useVaultMaster';
import { VaultInfo } from '../../../models/Vault';
import { getDisplayNumber } from '../../../utils/formatBN';
import useLiquidityLink from '../hooks/useLiquidityLink';
import SelectClaimStrategyModal from './SelectClaimStrategyModal';
import StakeComponent from './StakeComponent';
import UnstakeComponent from './UnstakeComponent';

type VaultItemProps = {
  vaultMaster: string;
  info: VaultInfo;
};

const VaultItem: React.FC<VaultItemProps> = ({ vaultMaster, info }) => {
  const chainId = useChainId();
  const claimStrategyToken = useToken(info?.claimStrategy);
  const handleReceipt = useHandleTransactionReceipt();
  const shortenVault = useShortenAddress(info?.address);
  const { claim, compound, removeVault } = useVaultMaster(vaultMaster);
  const { createAddLiquidityLink, createRemoveLiquidityLink } = useLiquidityLink();

  const template = useMemo(() => {
    return config.templates[chainId].find(
      (t) => t.id.toString() === info?.templateId.toString(),
    );
  }, [chainId, info?.templateId]);

  const [showSelectClaimStrategy] = useModal(
    <SelectClaimStrategyModal
      tokens={template?.claimStrategyTokens}
      vault={info?.address}
      vaultMaster={vaultMaster}
      selected={info?.claimStrategy}
    />,
  );

  const rewardToken = useToken(template?.rewardToken);

  const isHasReward = useMemo(() => {
    return info?.pendingRewards?.gt(BigNumber.from(0));
  }, [info]);

  const address = useMemo(() => {
    return info?.address;
  }, [info]);

  const shortenAddress = useMemo(() => {
    if (address && address.length > 0) {
      return `${address.substring(0, 8)}...${address.substring(
        address.length - 10,
        address.length,
      )}`;
    }
  }, [address]);

  const onCompound = useCallback(async () => {
    if (!compound || !address) return;
    await handleReceipt(compound([address]), `Compound manually vault ${shortenAddress}`);
  }, [compound, address, handleReceipt, shortenAddress]);

  const onClaim = useCallback(async () => {
    if (!claim || !address) return;
    await handleReceipt(claim([address]), `Claim rewards of vault ${shortenAddress}`);
  }, [claim, address, handleReceipt, shortenAddress]);

  const onAbandon = useCallback(async () => {
    if (!removeVault || !address) return;
    await handleReceipt(removeVault(address), `Abandon vault ${shortenAddress}`);
  }, [address, handleReceipt, removeVault, shortenAddress]);

  return (
    <StyledContainer>
      <StyledRow>
        Vault:
        <span>
          <Link
            href={`${config.network.explorerLink[chainId]}/address/${info?.address}`}
            target="_blank"
          >
            {shortenVault}
          </Link>
        </span>
      </StyledRow>
      <StyledRow>
        <div className="column">
          APY: <span>todo</span>
        </div>
        <div className="column">
          Daily returns: <span>todo</span>
        </div>
      </StyledRow>
      <StyledRow>
        <div className="column">
          {' '}
          Balance: <span>$todo</span>
        </div>
        <div className="column">
          Reward:
          <span>{getDisplayNumber(info?.pendingRewards, 18, 6)}</span>
          {rewardToken.symbol}
        </div>
      </StyledRow>
      <StyledControl>
        <StyledControlItem>
          <StakeComponent template={template} vault={info?.address} vaultMaster={vaultMaster} />
        </StyledControlItem>
        <Spacer size="md" />
        <StyledControlItem>
          <UnstakeComponent
            template={template}
            vault={info?.address}
            vaultMaster={vaultMaster}
            balanceInFarm={info?.balanceInFarm}
          />
        </StyledControlItem>
      </StyledControl>
      <StyledFooter>
        <div className="child">
          <Link
            href={createAddLiquidityLink(template?.market, template?.token0, template?.token1)}
            target="_blank"
          >
            Add liquidity
          </Link>
          <Spacer />
          <Link
            className="remove-liquidity-link"
            href={createRemoveLiquidityLink(
              template?.market,
              template?.token0,
              template?.token1,
            )}
            target="_blank"
          >
            Remove liquidity
          </Link>
        </div>
        <div className="child">
          {isHasReward && (
            <Button disabled={!isHasReward} onClick={onClaim}>
              {`Claim ${claimStrategyToken ? claimStrategyToken?.symbol : rewardToken?.symbol}`}
            </Button>
          )}
          {isHasReward && <Spacer />}
          {isHasReward && (
            <Button disabled={!isHasReward} onClick={onCompound}>
              Compound
            </Button>
          )}
          <Spacer />
          <Button onClick={showSelectClaimStrategy}>Set claim strategy</Button>
          <Spacer />
          {info?.canAbandon && <Button onClick={onAbandon}>Abandon</Button>}
        </div>
      </StyledFooter>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 10px 0px;
  padding: 20px 20px;
  border: 1px dashed #393939;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .column {
    span {
      margin: 0px 4px;
      font-weight: 600;
    }
  }
`;

const StyledControl = styled.div`
  display: flex;
  margin: 20px 0px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const StyledControlItem = styled.div`
  flex: 1;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  .child {
    display: flex;
    align-items: center;
    .remove-liquidity-link {
      margin-right: auto;
    }
    :last-child {
      margin-top: 10px;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export default VaultItem;
