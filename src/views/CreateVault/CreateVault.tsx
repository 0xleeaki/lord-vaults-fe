import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Buttons/Button';
import { Link, CustomNavLink } from '../../components/Buttons/Link';
import { Row, Col } from '../../components/Layout';
import Page from '../../components/Page';
import { config } from '../../config';
import { useChainId } from '../../hooks/useChainId';
import useHandleTransactionReceipt from '../../hooks/useHandleTransactionReceipt';
import useQuery from '../../hooks/useQuery';
import useShortenAddress from '../../hooks/useShortenAddress';
import { useVaultFactory } from '../../hooks/useVaultFactory';
import { useVaultMasterAddress } from '../../state/vault/hooks';
import TemplateItem from './components/TemplateItem';

const CreateVault: React.FC = () => {
  const chainId = useChainId();
  const query = useQuery();
  const handleReceipt = useHandleTransactionReceipt();
  const { createVault } = useVaultFactory();
  const vaultMaster = useVaultMasterAddress();
  const shortenVaultMaster = useShortenAddress(vaultMaster);
  const [selectId, setSelectId] = useState<number | undefined>(undefined);

  const templates = useMemo(() => {
    return config.templates[chainId] || [];
  }, [chainId]);

  useEffect(() => {
    if (!query) {
      return;
    }
    const templateId = query?.get('template');
    setSelectId(templateId ? +templateId : undefined);
  }, [query]);

  const onCreateVault = useCallback(() => {
    if (!createVault || !handleReceipt || selectId === undefined) return;
    handleReceipt(createVault(selectId), `Create vault master`);
  }, [createVault, handleReceipt, selectId]);

  return (
    <Page>
      <StyledContainer>
        <StyledHeader>
          <CustomNavLink to="/">
            <i className="fas fa-arrow-left" />
          </CustomNavLink>
          <div className="title">Create vault</div>
          <div>
            {`Master:`}
            <Link
              href={`${config.network.explorerLink[chainId]}/address/${vaultMaster}`}
              target="_blank"
            >
              {shortenVaultMaster}
            </Link>
          </div>
        </StyledHeader>
        <StyledNote>Step 1: Select your template</StyledNote>
        <CustomRow>
          {templates.map((template) => (
            <Col xl={4} key={template.id}>
              <TemplateItem
                selected={template.id === selectId}
                key={template.id}
                template={template}
              />
            </Col>
          ))}
        </CustomRow>
        <StyledNote>Step 2: Confirm</StyledNote>
        <Button className="confirm" disabled={selectId === undefined} onClick={onCreateVault}>
          Confirm
        </Button>
      </StyledContainer>
    </Page>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  .confirm {
    margin: 15px auto 10px auto;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  .title {
    color: #94febf;
    font-size: 22px;
    font-weight: 600;
    margin-right: auto;
    margin-left: 10px;
  }
  i {
    font-size: 20px;
  }
`;

const StyledNote = styled.div`
  margin: 20px 0px 0px 0px;
`;

const CustomRow = styled(Row)`
  justify-content: center;
  margin: -${(p) => p.gutter || '10px'};
  ${Col} {
    padding: ${(p) => p.gutter || '10px'};
    @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
      width: 50%;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
`;

export default CreateVault;
