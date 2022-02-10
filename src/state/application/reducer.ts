import { createReducer, nanoid } from '@reduxjs/toolkit';
import {
  addPopup,
  PopupContent,
  removePopup,
  updateBlockNumber,
  connectToAccount,
  disconnectAccount,
} from './actions';

type PopupList = Array<{
  key: string;
  show: boolean;
  content: PopupContent;
  removeAfterMs: number | null;
}>;


export enum ConnectorNames {
  injected = 'injected',
  walletConnect = 'walletConnect',
}

export interface ApplicationState {
  blockNumber: { [chainId: number]: number };
  popupList: PopupList;
  account?: string | null;
  connector?: ConnectorNames;
}

export const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  account: undefined,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 8000 } }) => {
      state.popupList = (
        key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    })
    .addCase(connectToAccount, (state, { payload: { account, connector } }) => {
      state.account = account;
      state.connector = connector;
    })
    .addCase(disconnectAccount, (state) => {
      state.account = undefined;
      state.connector = undefined;
    })
);
