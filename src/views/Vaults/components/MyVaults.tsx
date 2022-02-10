import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ButtonLink } from '../../../components/Buttons/ButtonLink';
import Spacer from '../../../components/Spacer';
import useHandleTransactionReceipt from '../../../hooks/useHandleTransactionReceipt';
import { useVaultMaster } from '../../../hooks/useVaultMaster';
import { useActiveMyVaults, useLeaveMyVaults, useVaultInfos } from '../../../state/vault/hooks';
import VaultItem from './VaultItem';

const MyVaults: React.FC<{ vaultMaster: string }> = ({ vaultMaster }) => {
  const handleReceipt = useHandleTransactionReceipt();
  const { claimAll, compoundAll } = useVaultMaster(vaultMaster);
  const vaultInfos = useVaultInfos();
  const activeMyVault = useActiveMyVaults();
  const leaveMyVault = useLeaveMyVaults();
  const loading = false;

  useEffect(() => {
    activeMyVault();
    return () => {
      leaveMyVault();
    };
  }, [activeMyVault, leaveMyVault]);

  const onClaimAll = useCallback(async () => {
    if (!claimAll) return;
    await handleReceipt(claimAll(), `Claim rewards of all vault`);
  }, [claimAll, handleReceipt]);

  const onCompoundAll = useCallback(async () => {
    if (!compoundAll) return;
    await handleReceipt(compoundAll(), `Compound all vault`);
  }, [compoundAll, handleReceipt]);

  return (
    <StyledContainer>
      {loading ? (
        <StyledText>Loading...</StyledText>
      ) : (
        <div>
          <StyledHeader>
            <div className="title">My vaults</div>
            <ButtonLink disabled={vaultInfos.length === 0} onClick={onClaimAll}>
              Claim all
            </ButtonLink>
            <Spacer />
            <ButtonLink disabled={vaultInfos.length === 0} onClick={onCompoundAll}>
              Compound all
            </ButtonLink>
          </StyledHeader>
          {vaultInfos.map((info, index) => (
            <VaultItem key={index} info={info} vaultMaster={vaultMaster} />
          ))}
          {vaultInfos.length === 0 && <StyledText>You don't have vaults!</StyledText>}
        </div>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: 20px 0px;
  .title {
    color: #94febf;
    font-size: 16px;
    font-weight: 600;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  .title {
    color: #94febf;
    font-size: 16px;
    font-weight: 600;
    margin-right: auto;
  }
`;

const StyledText = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export default MyVaults;
