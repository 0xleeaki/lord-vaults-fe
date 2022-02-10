import React from 'react';
import ApplicationUpdater from './application/updater';
import TransactionUpdater from './transactions/updater';
import VaultUpdater from './vault/updater';

const Updaters: React.FC = () => {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <VaultUpdater />
    </>
  );
};

export default Updaters;
