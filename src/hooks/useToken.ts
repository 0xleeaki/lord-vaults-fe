import { useMemo } from 'react';
import { config } from '../config';

export const useToken = (address: string) => {
  return useMemo(() => {
    return config.tokens.find((t) => t.address === address);
  }, [address]);
};
