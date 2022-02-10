import { createReducer } from '@reduxjs/toolkit';
import { VaultInfo } from '../../models/Vault';
import {
  updateVaultMasterAddress,
  updateVaults,
  updateVaultInfos,
  reset,
  active,
  leave,
} from './actions';

export interface ApplicationState {
  vaultMaster?: string | undefined;
  vaults: string[];
  vaultInfos: VaultInfo[];
  active: boolean;
}

export const initialState: ApplicationState = {
  vaultMaster: undefined,
  vaults: [],
  vaultInfos: [],
  active: true,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(reset, (state) => {
      state.vaultMaster = undefined;
      state.vaults = [];
      state.vaultInfos = [];
    })
    .addCase(active, (state) => {
      state.active = true;
    })
    .addCase(leave, (state) => {
      state.active = false;
    })
    .addCase(updateVaultMasterAddress, (state, { payload: { address } }) => {
      state.vaultMaster = address;
    })
    .addCase(updateVaults, (state, { payload: { vaults } }) => {
      state.vaults = vaults;
    })
    .addCase(updateVaultInfos, (state, { payload: { vaultInfos } }) => {
      state.vaultInfos = vaultInfos;
    }),
);
