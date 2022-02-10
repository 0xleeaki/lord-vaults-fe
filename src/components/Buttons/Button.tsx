import styled from 'styled-components';

export const Button = styled.button<{ error?: boolean }>`
  background: #0e1f17;
  color: #94febf;
  border: 1px solid #94febf;
  padding: 8px 16px;
  font-size: 14px;
  :hover {
    :not(:disabled) {
      background-color: #94febf;
      border-color: #94febf;
      color: #000403;
    }
  }
  :disabled {
    background: #0e1f17;
    color: #393939;
    border: 1px solid #393939;
    cursor: not-allowed;
  }
`;
