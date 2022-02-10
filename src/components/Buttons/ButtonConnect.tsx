import React from 'react';
import useModal from '../../hooks/useModal';
import { ModalSelectWallet } from '../AccountModal/ModalSelectWallet';
import { Button } from './Button';

const ButtonConnect: React.FC = () => {
  const [connect] = useModal(<ModalSelectWallet />);

  return <Button onClick={() => connect()}>Connect</Button>;
};

export default ButtonConnect;
