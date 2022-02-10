import { useContract } from './useContract';
import { useEffect, useMemo, useState } from 'react';
import { useChainId } from './useChainId';
import ABI from '../abis';
import { config } from '../config';
import { useWeb3React } from '@web3-react/core';
import { Address0 } from '../utils/constants';

export type VaultFactoryInfo = {
  vaultMaster: string;
};

export const useVaultFactoryInfo = () => {
  const chainId = useChainId();
  const { account } = useWeb3React();
  const contract = useContract(
    config.contracts[chainId].vaultFactory,
    ABI[chainId].VaultFactory,
  );

  const [vaultMaster, setVaultMaster] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!contract || !account) return;
    contract.getUserVaultMaster(account).then((address: string) => {
      if (address !== Address0) {
        setVaultMaster(address);
      }
    });
  }, [account, contract]);

  return useMemo(() => {
    return {
      vaultMaster,
    };
  }, [vaultMaster]);
};
