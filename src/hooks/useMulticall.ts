import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { config } from '../config';
import { Call, multicall } from './multicall';

export const useMulticall = () => {
  const { library, chainId } = useWeb3React();

  return useCallback(
    (calls: Call[]) => {
      const contractAddresses = config.contracts[chainId];

      if (contractAddresses && contractAddresses.multicall) {
        return multicall(library, contractAddresses.multicall, calls);
      }
    },
    [chainId, library],
  );
};
