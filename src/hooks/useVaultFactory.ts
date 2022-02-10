import { useContract } from './useContract';
import { useCallback, useMemo } from 'react';
import { useChainId } from './useChainId';
import ABI from '../abis';
import { config } from '../config';
import { BigNumber } from '@ethersproject/bignumber';

export type VaultFactory = {
  createVaultMaster: () => Promise<string>;
  createVault: (strategyId: number) => Promise<string>;
};

export const useVaultFactory = () => {
  const chainId = useChainId();
  const contract = useContract(
    config.contracts[chainId].vaultFactory,
    ABI[chainId].VaultFactory,
  );

  const createVaultMaster = useCallback(() => {
    if (!contract) return;
    return contract.createVaultMaster();
  }, [contract]);

  const createVault = useCallback(
    (strategyId: number) => {
      if (!contract) return;
      return contract.createVault(BigNumber.from(strategyId));
    },
    [contract],
  );

  return useMemo(() => {
    return {
      createVaultMaster,
      createVault,
    };
  }, [createVaultMaster, createVault]);
};
