import { createAction } from '@reduxjs/toolkit';
import { ConnectorNames } from './reducer';

export type PopupContent = {
  txn?: {
    hash: string;
    success: boolean;
    summary?: string;
  };
  error?: {
    message: string;
    title: string;
  };
};

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>(
  'app/updateBlockNumber',
);

export const addPopup = createAction<{
  key?: string;
  removeAfterMs?: number | null;
  content: PopupContent;
}>('app/addPopup');

export const removePopup = createAction<{ key: string }>('app/removePopup');

export const connectToAccount = createAction<{ account: string; connector?: ConnectorNames }>(
  'app/connectToAccount',
);
export const disconnectAccount = createAction('app/disconnectAccount');
