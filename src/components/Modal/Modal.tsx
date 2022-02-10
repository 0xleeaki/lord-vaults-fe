import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

export interface ModalProps {
  onDismiss?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({ children, size }) => {
  return (
    <Container size={size || 'sm'}>
      <StyledModal>
        <div>{children}</div>
      </StyledModal>
    </Container>
  );
};

const StyledModal = styled.div`
  position: relative;
  background: #000403;
  padding: 10px 20px;
  border: 1px solid #393939;
`;

export const ModalHeader = styled.div<{ center?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
`;

export const ModalTitle = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
`;

export const ModalCloseButton = styled.button.attrs({
  children: <i className="fal fa-times" />,
})`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 1;
  font-size: 16px;
  color: #94febf;
  &:hover {
    color: #40b971;
  }
`;

export const ModalContent = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export default Modal;
