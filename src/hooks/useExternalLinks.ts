import { ChainId } from './../utils/constants';
import { useWeb3React } from '@web3-react/core';
import { ExternalLinks } from '../utils/constants';

export const useExternalLinks = () => {
  const { chainId } = useWeb3React();
  return chainId ? ExternalLinks[chainId] || ExternalLinks[ChainId.POLYGON] : ExternalLinks[ChainId.POLYGON];
};
