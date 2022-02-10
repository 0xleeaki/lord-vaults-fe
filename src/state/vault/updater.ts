import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useGetMyVaultInfo from '../../hooks/useGetMyVaultInfo';
import { useVaultFactoryInfo } from '../../hooks/useVaultFactoryInfo';
import { updateVaultMasterAddress, updateVaultInfos, updateVaults, reset } from './actions';

export default function Updater(): null {
  const dispatch = useDispatch();
  const { vaultMaster } = useVaultFactoryInfo();
  const { vaultInfos, vaults } = useGetMyVaultInfo(vaultMaster);

  const updateVaultMasterState = useCallback(() => {
    dispatch(
      updateVaultMasterAddress({
        address: vaultMaster,
      }),
    );
  }, [dispatch, vaultMaster]);

  const updateVaultsState = useCallback(() => {
    dispatch(
      updateVaults({
        vaults,
      }),
    );
  }, [dispatch, vaults]);

  const updateVaultInfosState = useCallback(() => {
    dispatch(
      updateVaultInfos({
        vaultInfos,
      }),
    );
  }, [dispatch, vaultInfos]);

  useEffect(() => {
    updateVaultMasterState();
    updateVaultsState();
    updateVaultInfosState();
    return () => {
      reset();
    };
  }, [updateVaultInfosState, updateVaultMasterState, updateVaultsState]);

  return null;
}
