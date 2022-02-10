import { useCallback, useMemo } from 'react';
import {
  addPopup,
  PopupContent,
  removePopup,
  connectToAccount,
  disconnectAccount,
} from './actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../index';
import { useWeb3React } from '@web3-react/core';
import { ConnectorNames } from './reducer';

export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3React();
  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }));
    },
    [dispatch],
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch],
  );
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}

export function useGetConnectedAccount(): string | null | undefined {
  return useSelector((state: AppState) => state.application.account);
}

export function useSetConnectedAccount(): (
  account: string,
  connector?: ConnectorNames,
) => void {
  const dispatch = useDispatch();
  return useCallback(
    (account: string, connector?: ConnectorNames) => {
      dispatch(connectToAccount({ account, connector: connector }));
    },
    [dispatch],
  );
}

export function useDisconnectAccount(): () => void {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(disconnectAccount());
  }, [dispatch]);
}

export function useSavedConnector() {
  const connector = useSelector((state: AppState) => state.application.connector);
  return connector;
}
