import { useMemo } from 'react';

const useShortenAddress = (address: string) => {
  return useMemo(() => {
    if (address && address.length > 0) {
      return `${address.substring(0, 4)}...${address.substring(
        address.length - 4,
        address.length,
      )}`;
    }
  }, [address]);
};

export default useShortenAddress;
