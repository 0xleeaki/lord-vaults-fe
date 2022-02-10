import { useWeb3React } from '@web3-react/core';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useToken } from '../../../hooks/useToken';
import { TemplateConfig } from '../../../models/Template';

const TemplateItem: React.FC<{ template: TemplateConfig; selected?: boolean }> = ({
  template,
  selected,
}) => {
  const { account } = useWeb3React();
  const history = useHistory();
  const rewardToken = useToken(template.rewardToken);

  const selectVault = useCallback(
    async (id: number) => {
      if (!history || !account) return;
      history.push(`?template=${id}`);
    },
    [history, account],
  );

  return (
    <StyledContainer selected={selected} onClick={() => selectVault(template.id)}>
      Deposit
      <span>
        {template?.token0}
        {template?.token1 ? '/' + template?.token1 : ''}
      </span>
      earn
      <span>{rewardToken?.symbol}</span>
    </StyledContainer>
  );
};

const StyledContainer = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  margin: 15px 0px;
  padding: 10px;
  background: #0e1f17;
  color: #94febf;
  border: 1px solid ${({ selected }) => (selected ? '#94febf' : '#393939')};
  cursor: pointer;
  span {
    margin: 0px 4px;
    color: #94febf;
  }
  button {
    margin-left: auto;
  }
  :hover {
    border-color: #94febf;
  }
`;

export default TemplateItem;
