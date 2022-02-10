import { createAction } from '@reduxjs/toolkit';
import { VaultInfo } from '../../models/Vault';

export const reset = createAction('vault/reset');

export const updateVaultMasterAddress = createAction<{ address: string }>(
  'vault/updateVaultMaster',
);

export const active = createAction('vault/active');

export const leave = createAction('vault/leave');

export const updateVaults = createAction<{ vaults: string[] }>('vault/updateVaults');

export const updateVaultInfos =
  createAction<{ vaultInfos: VaultInfo[] }>('vault/updateVaultInfos');
