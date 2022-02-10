import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VaultInfo } from '../models/Vault';
import { useBlockNumber } from '../state/application/hooks';
import { useMyVaultsActive } from '../state/vault/hooks';
import { useMulticall } from './useMulticall';

const useGetMyVaultInfo = (vaultMaster: string) => {
  const { account } = useWeb3React();
  const active = useMyVaultsActive();
  const multicall = useMulticall();
  const blockNumber = useBlockNumber();
  const lastCheckedBlockNumber = useRef<number>();
  const numberOfBlockNumberToSkip = 10;
  const [vaults, setVaults] = useState<string[]>([]);
  const [vaultInfos, setVaultInfos] = useState<VaultInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account || !multicall || !vaultMaster) {
      return;
    }
    // TODO: refactor
    multicall([
      ...[0].map((id) => {
        return {
          target: vaultMaster,
          signature: 'vaults(uint256) view returns (address)',
          params: [BigNumber.from(id)],
        };
      }),
    ])
      .then((data) => {
        setLoading(false);
        setVaults(data.map((i) => i[0]));
      })
      .catch(() => {
        setVaults([]);
        setLoading(false);
      });
  }, [account, multicall, vaultMaster]);

  const getListMyVaultInfo = useCallback(async () => {
    if (!multicall || !vaultMaster || vaults.length === 0) {
      return;
    }
    if (lastCheckedBlockNumber.current > blockNumber - numberOfBlockNumberToSkip) {
      return;
    }
    const callData = await multicall([
      ...(vaults || []).map((vault) => {
        return {
          target: vaultMaster,
          signature:
            'vaultInfo(address _vaultAddress) view returns (uint256, uint256, uint256, address, address, bool)',
          params: [vault],
        };
      }),
      ...(vaults || []).map((vault) => {
        return {
          target: vaultMaster,
          signature: 'claimStrategies(address _vaultAddress) view returns (address)',
          params: [vault],
        };
      }),
    ]);
    const infoCallData = callData.slice(0, vaults.length);
    const claimStrategyData = callData.slice(vaults.length, callData.length);
    const rewardTokens = infoCallData.map((i) => i[4]);
    const balanceCallData = await multicall([
      ...(rewardTokens || []).map((token, index) => {
        return {
          target: token,
          signature: 'balanceOf(address user) view returns (uint256)',
          params: [vaults[index]],
        };
      }),
    ]);
    lastCheckedBlockNumber.current = blockNumber;
    return infoCallData.map((info, index) => {
      return {
        address: vaults[index],
        templateId: info[0],
        balanceInFarm: info[1],
        pendingRewards: info[2].add(balanceCallData[index][0]),
        wantToken: info[3],
        rewardToken: info[4],
        canAbandon: info[5],
        claimStrategy: claimStrategyData[index][0],
      };
    });
  }, [blockNumber, multicall, vaultMaster, vaults]);

  useEffect(() => {
    let mounted = true;
    if (!account || !active) {
      return;
    }
    getListMyVaultInfo()
      .then((data) => {
        if (mounted && data) {
          setVaultInfos(data);
          setLoading(false);
        }
      })
      .catch(() => {
        setVaultInfos([]);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [account, getListMyVaultInfo, active]);

  return { vaults, vaultInfos, loading };
};

export default useGetMyVaultInfo;
