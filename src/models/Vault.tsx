import { BigNumber } from '@ethersproject/bignumber';

export type VaultInfo = {
  address?: string;
  templateId: BigNumber;
  balanceInFarm: BigNumber;
  pendingRewards: BigNumber;
  wantToken: string;
  rewardToken: string;
  claimStrategy?: string;
  canAbandon: boolean;
};
