import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import { useERC20 } from './useERC20';

const useAllowance = (address: string, spender: string, pendingApproval?: boolean) => {
  const { account } = useWeb3React();
  const token = useERC20(address);
  const [allowance, setAllowance] = useState<BigNumber>(null);

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err}`, err));
    }
  }, [account, spender, token, pendingApproval, fetchAllowance]);

  return allowance;
};

export default useAllowance;
