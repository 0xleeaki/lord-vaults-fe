import { parseUnits } from '@ethersproject/units';
import Bsc from './../assets/img/networks/binance-chain.svg';
import Polygon from './../assets/img/networks/polygon-chain.png';

export const BlocksPerYear = 2102400; // ethereum estimate

export const Precision = parseUnits('1', 18);

export const MaxTransactionHistory = 10;

export const DefaultTokenDecimal = 18;

export const Address0 = '0x0000000000000000000000000000000000000000';

export enum ChainId {
  POLYGON = 137,
  POLYGON_TESTNET = 80001,
  BSC = 56,
  BSC_TESTNET = 97,
}

export const NETWORK: {
  [chainId in ChainId]?: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
} = {
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.POLYGON]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  },
};

export const NETWORK_ICON = {
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.POLYGON]: Polygon,
  [ChainId.POLYGON_TESTNET]: Polygon,
};

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.BSC]: 'Binance',
  [ChainId.BSC_TESTNET]: 'Binance',
  [ChainId.POLYGON]: 'Polygon',
  [ChainId.POLYGON_TESTNET]: 'Polygon',
};

export const ExternalLinks: { [chain: number]: { [property: string]: any } } = {
  [ChainId.BSC]: {
    twitter: '',
    documentations: '',
    codes: '',
    discord: '',
    medium: '',
    telegram: '',
  },
  [ChainId.POLYGON]: {
    twitter: '',
    documentations: '',
    codes: '',
    discord: '',
    medium: '',
    telegram: '',
  },
};
