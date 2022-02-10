import { useCallback } from 'react';
import { ModalSelectWallet } from '../components/AccountModal/ModalSelectWallet';
import useModalWithFC from './useModalWithFC';

const useTryConnect = () => {
  const { showModal, hideModal } = useModalWithFC();
  const tryConnect = useCallback(async () => {
    showModal(ModalSelectWallet, {
      onDismiss: hideModal,
    });
  }, [hideModal, showModal]);

  return {
    tryConnect,
  };
};

export default useTryConnect;
