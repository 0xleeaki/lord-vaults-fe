import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

export const useContract = (address: string | undefined, abi: any[]) => {
  const { library, account } = useWeb3React<JsonRpcProvider>();

  return useMemo(() => {
    if (!library || !address) {
      return;
    }

    return new Contract(address, abi, account ? library.getSigner(account) : library);
  }, [library, address, abi, account]);
};
