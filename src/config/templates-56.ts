import { TemplateConfig } from '../models/Template';

export const Tokens: { [key: string]: string } = {
  ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  USDT: '0x55d398326f99059fF775485246999027B3197955',
};

export const Templates: TemplateConfig[] = [
  {
    id: 0,
    token0: 'ETH',
    token1: 'USDT',
    wantToken: '0xF63509631777DAAeC8a29ecd2B16fD15d668571D', // ETH/USDT LP
    rewardToken: '0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90', // WEX
    market: 'WaultFinance',
    isLp: true,
    claimStrategyTokens: [
      '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', // ETH
      '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // BUSD
      '0x55d398326f99059fF775485246999027B3197955', // USDT
      '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // WBNB
    ],
  },
];
