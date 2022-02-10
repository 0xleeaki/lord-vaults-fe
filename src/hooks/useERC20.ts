import { useContract } from './useContract';
import { useCallback, useMemo } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { useToken } from './useToken';
import { useChainId } from './useChainId';
import ABI from '../abis';

export type ERC20 = {
  address: string;
  decimals: number;
  symbol: string;
  balanceOf: (account: string) => Promise<BigNumber>;
  allowance: (owner: string, spender: string) => Promise<BigNumber>;
  approve: (spender: string, amount: BigNumber) => Promise<any>;
};

export const useERC20 = (address: string) => {
  const chainId = useChainId();
  const contract = useContract(address, ABI[chainId].IERC20);
  const token = useToken(address);

  const balanceOf = useCallback(
    (account: string) => {
      if (!contract || !account) return;
      return contract.balanceOf(account);
    },
    [contract],
  );

  const allowance = useCallback(
    (owner: string, spender: string) => {
      if (!contract || !owner || !spender) return;
      return contract.allowance(owner, spender);
    },
    [contract],
  );

  const approve = useCallback(
    (spender: string, amount: BigNumber) => {
      if (!contract || !spender || !amount) return;
      return contract.approve(spender, amount);
    },
    [contract],
  );

  return useMemo(() => {
    return {
      address,
      decimals: token?.decimals,
      symbol: token?.symbol,
      balanceOf,
      allowance,
      approve,
    };
  }, [address, allowance, approve, balanceOf, token?.decimals, token?.symbol]);
};
