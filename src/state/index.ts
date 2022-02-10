import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import transactions from './transactions/reducer';
import vault from './vault/reducer';
import application, { initialState as appInitialState } from './application/reducer';

const PERSISTED_KEYS: string[] = [
  'application.account',
  'transactions',
  'application.connector',
  'vault.vaultMaster',
];

const store = configureStore({
  reducer: {
    application,
    transactions,
    vault,
  },
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }),
    save({ states: PERSISTED_KEYS, namespace: '__lord_finance' }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    namespace: '__lord_finance',
    preloadedState: {
      application: { ...appInitialState },
    },
  }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
