import { useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { TransactionCustomData, useTransactionAdder } from '../state/transactions/hooks';
import { useAddPopup } from '../state/application/hooks';
import WaitingApproval from '../components/WaitingApproval';
import WaitingApprovalResult from '../components/WaitingApprovalResult';
import useModalWithFC from './useModalWithFC';
import { getErrorMessage } from '../utils/transactionError';

const useHandleTransactionReceipt = () => {
  const { showModal, hideModal } = useModalWithFC('approval');
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  return useCallback(
    async (
      promise: Promise<TransactionResponse>,
      summary: string,
      customData?: TransactionCustomData,
    ) => {
      showModal(WaitingApproval, {
        message: summary,
        onDismiss: hideModal,
      });
      try {
        customData = customData || {};
        const response = await promise;
        showModal(WaitingApprovalResult, {
          onDismiss: hideModal,
          transactionHash: response.hash,
        });
        addTransaction(response, { ...customData, summary });
        return response;
      } catch (err: any) {
        hideModal();
        const { title, message } = getErrorMessage(err, summary);
        addPopup({ error: { message, title } });
        throw err;
      }
    },
    [addPopup, addTransaction, showModal, hideModal],
  );
};

export default useHandleTransactionReceipt;
