import { TemplateConfig } from '../models/Template';

export const Tokens: { [key: string]: string } = {
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
};

export const Templates: TemplateConfig[] = [
  {
    id: 0,
    token0: 'USDC',
    token1: 'WETH',
    wantToken: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d', // USDC/WETH LP
    rewardToken: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', // QUICK
    market: 'QuickSwap',
    isLp: true,
    claimStrategyTokens: [
      '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
      '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
    ],
  },
  {
    id: 1,
    token0: 'WMATIC',
    token1: 'USDC',
    wantToken: '0x8312A29A91D9Fac706F4d2ADEB1FA4540faD1673', // WMATIC/USDC LP
    rewardToken: '0x4c4BF319237D98a30A929A96112EfFa8DA3510EB', // WEX
    market: 'WaultFinance',
    isLp: true,
    claimStrategyTokens: [
      '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
      '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
    ],
  },
];
