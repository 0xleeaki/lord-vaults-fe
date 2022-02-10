import { useCallback, useMemo } from 'react';
import { Tokens as TokensPolygon } from '../../../config/templates-137';
import { Tokens as TokensBSC } from '../../../config/templates-56';
import { useChainId } from '../../../hooks/useChainId';
import { Market } from '../../../models/Template';
import { ChainId } from '../../../utils/constants';

const useLiquidityLink = () => {
  const chainId = useChainId();

  const tokens = useMemo(() => {
    if (chainId === ChainId.POLYGON) return TokensPolygon;
    return TokensBSC;
  }, [chainId]);

  const createAddLiquidityLink = useCallback(
    (marketName: Market, token0: string, token1: string) => {
      switch (marketName) {
        case 'QuickSwap':
          return `https://quickswap.exchange/#/add/${tokens[token0?.toUpperCase()] || ''}/${
            tokens[token1?.toUpperCase()] || ''
          }`;
        case 'LordFinance':
        case 'SushiSwap':
          return `https://app.sushi.com/add/${tokens[token0?.toUpperCase()] || ''}/${
            tokens[token1?.toUpperCase()] || ''
          }`;
        case 'WaultFinance':
          return `https://swap.wault.finance/${
            chainId === ChainId.BSC ? 'bsc' : 'polygon'
          }/#/add/${tokens[token0?.toUpperCase()] || ''}/${
            tokens[token1?.toUpperCase()] || ''
          }`;
      }
    },
    [chainId, tokens],
  );

  const createRemoveLiquidityLink = useCallback(
    (marketName: Market, token0: string, token1: string) => {
      switch (marketName) {
        case 'QuickSwap':
          return `https://quickswap.exchange/#/remove/${tokens[token0?.toUpperCase()] || ''}/${
            tokens[token1?.toUpperCase()] || ''
          }`;
        case 'LordFinance':
        case 'SushiSwap':
          return `https://app.sushi.com/remove/${tokens[token0?.toUpperCase()] || ''}/${
            tokens[token1?.toUpperCase()] || ''
          }`;
        case 'WaultFinance':
          return `https://swap.wault.finance/${
            chainId === ChainId.BSC ? 'bsc' : 'pollygon'
          }/#/remove/${tokens[token0?.toUpperCase()] || ''}/${
            tokens[token1?.toUpperCase()] || ''
          }`;
      }
    },
    [chainId, tokens],
  );

  return {
    createAddLiquidityLink,
    createRemoveLiquidityLink,
  };
};

export default useLiquidityLink;
