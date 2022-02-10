import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '..';
import { VaultInfo } from '../../models/Vault';
import {
  updateVaultMasterAddress,
  updateVaults,
  updateVaultInfos,
  reset,
  active,
  leave,
} from './actions';

export const useUpdateVaultMasterAddress = () => {
  const dispatch = useDispatch();
  return useCallback(
    (address: string) => {
      dispatch(
        updateVaultMasterAddress({
          address,
        }),
      );
    },
    [dispatch],
  );
};

export const useUpdateVaults = () => {
  const dispatch = useDispatch();
  return useCallback(
    (vaults: string[]) => {
      dispatch(
        updateVaults({
          vaults,
        }),
      );
    },
    [dispatch],
  );
};

export const useUpdateVaultInfos = () => {
  const dispatch = useDispatch();
  return useCallback(
    (vaultInfos: VaultInfo[]) => {
      dispatch(
        updateVaultInfos({
          vaultInfos,
        }),
      );
    },
    [dispatch],
  );
};

export const useResetVault = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(reset());
  }, [dispatch]);
};

export const useActiveMyVaults = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(active());
  }, [dispatch]);
};

export const useLeaveMyVaults = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(leave());
  }, [dispatch]);
};

export const useVaultMasterAddress = () => {
  const vaultMaster = useSelector((state: AppState) => state.vault.vaultMaster);
  return vaultMaster;
};

export const useVaults = () => {
  const vaults = useSelector((state: AppState) => state.vault.vaults);
  return vaults;
};

export const useVaultInfos = () => {
  const vaultInfos = useSelector((state: AppState) => state.vault.vaultInfos);
  return vaultInfos;
};

export const useMyVaultsActive = () => {
  const active = useSelector((state: AppState) => state.vault.active);
  return active;
};
