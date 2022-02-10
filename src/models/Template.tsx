export type Market = 'LordFinance' | 'QuickSwap' | 'SushiSwap' | 'WaultFinance';

export type TemplateConfig = {
  id?: number;
  token0?: string;
  token1?: string;
  wantToken?: string;
  rewardToken: string;
  market?: Market;
  isLp: boolean;
  stable?: boolean;
  profitSharing?: boolean;
  coming?: boolean;
  inactive?: boolean;
  claimStrategyTokens: string[];
};
