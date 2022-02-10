import styled from 'styled-components';

export const ButtonLink = styled.button<{ error?: boolean }>`
  color: #94febf;
  font-size: 14px;
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  :hover {
    :not(:disabled) {
      color: #40b971;
      text-decoration: underline;
    }
  }
  :disabled {
    color: #393939;
    cursor: not-allowed;
  }
`;
