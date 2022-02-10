import { useWeb3React } from '@web3-react/core';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Buttons/Button';
import ButtonConnect from '../../components/Buttons/ButtonConnect';
import { Link } from '../../components/Buttons/Link';
import Page from '../../components/Page';
import { config } from '../../config';
import { useChainId } from '../../hooks/useChainId';
import useHandleTransactionReceipt from '../../hooks/useHandleTransactionReceipt';
import useShortenAddress from '../../hooks/useShortenAddress';
import { useVaultFactory } from '../../hooks/useVaultFactory';
import { useVaultMasterAddress } from '../../state/vault/hooks';
import MyVaults from './components/MyVaults';

const Vaults: React.FC = () => {
  const chainId = useChainId();
  const { account } = useWeb3React();
  const handleReceipt = useHandleTransactionReceipt();
  const { createVaultMaster } = useVaultFactory();
  const vaultMaster = useVaultMasterAddress();
  const shortenVaultMaster = useShortenAddress(vaultMaster);

  const onCreateVaultMaster = useCallback(() => {
    if (!createVaultMaster || !handleReceipt) return;
    handleReceipt(createVaultMaster(), `Create vault master`);
  }, [createVaultMaster, handleReceipt]);

  return (
    <Page>
      <StyledContainer>
        <StyledHeader>
          <span className="title">Master</span>
          {shortenVaultMaster && (
            <Link
              href={`${config.network.explorerLink[chainId]}/address/${vaultMaster}`}
              target="_blank"
            >
              {shortenVaultMaster}
            </Link>
          )}
          <div className="btn">
            {vaultMaster ? (
              <ButtonCreateVault to="/create">Create vault</ButtonCreateVault>
            ) : !account ? (
              <ButtonConnect />
            ) : (
              <Button onClick={onCreateVaultMaster}>Create vault master</Button>
            )}
          </div>
        </StyledHeader>
        {vaultMaster && <MyVaults vaultMaster={vaultMaster} />}
      </StyledContainer>
    </Page>
  );
};

const StyledContainer = styled.div``;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  .title {
    color: #94febf;
    font-size: 22px;
    font-weight: 600;
    margin-right: 10px;
  }
  .btn {
    margin-left: auto;
  }
`;

const ButtonCreateVault = styled(NavLink)`
  background: #0e1f17;
  color: #94febf;
  border: 1px solid #94febf;
  padding: 6px 16px;
  font-size: 14px;
  text-decoration: none;
`;

export default Vaults;
