import { useWeb3React } from '@web3-react/core';
import { config } from '../config';

export const useChainId = () => {
  const { chainId } = useWeb3React();
  return chainId ? chainId : config.network.defaultChainId;
};
