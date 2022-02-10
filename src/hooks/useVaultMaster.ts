import { useContract } from './useContract';
import { useCallback, useMemo } from 'react';
import { useChainId } from './useChainId';
import ABI from '../abis';
import { BigNumber } from '@ethersproject/bignumber';
import { VaultInfo } from '../models/Vault';

export type VaultMaster = {
  address: string;
  getVault: (number: string) => Promise<string>;
  getVaultInfo: (address: string) => Promise<VaultInfo>;
  removeVault: (address: string) => Promise<undefined>;
  deposit: (address: string, amount: BigNumber) => Promise<undefined>;
  withdraw: (address: string, amount: BigNumber) => Promise<undefined>;
  exit: (address: string) => Promise<undefined>;
  compoundAll: (address: string) => Promise<undefined>;
  compound: (address: string) => Promise<undefined>;
  claimAll: (address: string) => Promise<undefined>;
  claim: (address: string) => Promise<undefined>;
  getClaimStrategy: (address: string) => Promise<string>;
  setClaimStrategy: (address: string, target: string) => Promise<undefined>;
  removeClaimStrategy: (address: string) => Promise<undefined>;
};

export const useVaultMaster = (address: string) => {
  const chainId = useChainId();
  const contract = useContract(address, ABI[chainId].VaultMaster);

  const getVault = useCallback(
    (index: number) => {
      if (!contract) return;
      return contract.vaults(BigNumber.from(index));
    },
    [contract],
  );

  const getVaultInfo = useCallback(
    (vaultAddress: string) => {
      if (!contract) return;
      return contract.vaultInfo(vaultAddress);
    },
    [contract],
  );

  const removeVault = useCallback(
    (vaultAddress: string) => {
      if (!contract) return;
      return contract.removeVault(vaultAddress);
    },
    [contract],
  );

  const deposit = useCallback(
    (vaultAddress: string, amount: BigNumber) => {
      if (!contract) return;
      return contract.deposit(vaultAddress, amount);
    },
    [contract],
  );

  const withdraw = useCallback(
    (vaultAddress: string, amount: BigNumber) => {
      if (!contract) return;
      return contract.withdraw(vaultAddress, amount);
    },
    [contract],
  );

  const exit = useCallback(
    (vaultAddress: string) => {
      if (!contract) return;
      return contract.exit(vaultAddress);
    },
    [contract],
  );

  const compoundAll = useCallback(() => {
    if (!contract) return;
    return contract.compoundAll();
  }, [contract]);

  const compound = useCallback(
    (vaultAddresses: string[]) => {
      if (!contract) return;
      return contract.compound(vaultAddresses);
    },
    [contract],
  );

  const claimAll = useCallback(() => {
    if (!contract) return;
    return contract.claimAll();
  }, [contract]);

  const claim = useCallback(
    (vaultAddresses: string[]) => {
      if (!contract) return;
      return contract.claim(vaultAddresses);
    },
    [contract],
  );

  const getClaimStrategy = useCallback(
    (vaultAddress: string) => {
      if (!contract) return;
      return contract.claimStrategies(vaultAddress);
    },
    [contract],
  );

  const setClaimStrategy = useCallback(
    (vaultAddress: string, target: string) => {
      if (!contract) return;
      return contract.setClaimStategy(vaultAddress, target);
    },
    [contract],
  );

  const removeClaimStrategy = useCallback(
    (vaultAddress: string) => {
      if (!contract) return;
      return contract.removeClaimStategy(vaultAddress);
    },
    [contract],
  );

  return useMemo(() => {
    return {
      address,
      getVault,
      getVaultInfo,
      removeVault,
      deposit,
      withdraw,
      exit,
      compound,
      compoundAll,
      claim,
      claimAll,
      getClaimStrategy,
      setClaimStrategy,
      removeClaimStrategy,
    };
  }, [
    address,
    claim,
    claimAll,
    compound,
    compoundAll,
    deposit,
    exit,
    getVault,
    getVaultInfo,
    removeClaimStrategy,
    removeVault,
    setClaimStrategy,
    withdraw,
    getClaimStrategy,
  ]);
};
