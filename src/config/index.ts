import { TemplateConfig } from '../models/Template';
import { ChainId } from '../utils/constants';
import { Templates as Templates56 } from './templates-56';
import { Templates as Templates137 } from './templates-137';

export type TokenInfo = {
  address: string;
  symbol: string;
  decimals: number;
};

type Config = {
  brandName: string;
  backendUrl: string;
  network: {
    rpcUrls: Record<number, string>;
    defaultChainId: number;
    explorerLink: Record<number, string>;
  };
  contracts: Record<number, Record<string, string>>;
  templates: Record<number, Array<TemplateConfig>>;
  tokens: TokenInfo[];
};

export const config: Config = {
  brandName: 'Lord Vaults',
  backendUrl: '',
  network: {
    rpcUrls: {
      [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
      [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      [ChainId.POLYGON]: 'https://rpc-mainnet.matic.network',
      [ChainId.POLYGON_TESTNET]: 'https://rpc-mumbai.matic.today',
    },
    explorerLink: {
      [ChainId.BSC]: 'https://bscscan.com',
      [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
      [ChainId.POLYGON]: 'https://polygonscan.com',
      [ChainId.POLYGON_TESTNET]: 'https://explorer-mumbai.maticvigil.com',
    },
    defaultChainId: ChainId.POLYGON,
  },
  contracts: {
    [ChainId.BSC]: {
      multicall: '0xCE9197219344FA32729f7a9aBE28Fe3bf1c81EC9',
      vaultFactory: '0xD8ECd6c9e59C6C528d18B9F709755b85ddFc74Ec',
    },
    [ChainId.BSC_TESTNET]: {
      multicall: '0x6e5bb1a5ad6f68a8d7d6a5e47750ec15773d6042',
    },
    [ChainId.POLYGON]: {
      multicall: '0x2C738AABBd2FA2e7A789433965BEEb7429cB4D7e',
      vaultFactory: '0x3d3d3cdce398ceaa21636d674cae3964e988ef44',
    },
    [ChainId.POLYGON_TESTNET]: {
      multicall: '0x935Bfe9AfaA2Be26049ea4EDE40A3A2243361F87',
    },
  },
  templates: {
    [ChainId.POLYGON]: Templates137,
    [ChainId.BSC]: Templates56,
  },
  tokens: [
    // Polygon
    {
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      decimals: 18,
      symbol: 'WETH',
    },
    {
      address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
      decimals: 18,
      symbol: 'QUICK',
    },
    {
      address: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d',
      decimals: 18,
      symbol: 'USDC/WETH LP',
    },
    {
      address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      decimals: 18,
      symbol: 'WMATIC',
    },
    {
      address: '0x8312A29A91D9Fac706F4d2ADEB1FA4540faD1673',
      decimals: 18,
      symbol: 'WMATIC/USDC LP',
    },
    {
      address: '0x4c4BF319237D98a30A929A96112EfFa8DA3510EB',
      decimals: 18,
      symbol: 'WEX',
    },
    // BSC
    {
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      decimals: 18,
      symbol: 'BUSD',
    },
    {
      address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
      decimals: 18,
      symbol: 'ETH',
    },
    {
      address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      decimals: 18,
      symbol: 'BTCB',
    },
    {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      decimals: 18,
      symbol: 'WBNB',
    },
    {
      address: '0x55d398326f99059fF775485246999027B3197955',
      decimals: 18,
      symbol: 'USDT',
    },
    {
      address: '0xF63509631777DAAeC8a29ecd2B16fD15d668571D',
      decimals: 18,
      symbol: 'ETH/USDT LP',
    },
    {
      address: '0xa9c41A46a6B3531d28d5c32F6633dd2fF05dFB90',
      decimals: 18,
      symbol: 'WEX',
    },
  ],
};

export const supportedChainIds = Object.keys(config.network.rpcUrls).map((t) => +t);
