import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled.a`
  font-size: 14px;
  color: #94febf;
  text-decoration: none;
  &:hover {
    color: #40b971;
    text-decoration: underline;
  }
`;

export const CustomNavLink = styled(NavLink)`
  font-size: 14px;
  color: #94febf;
  text-decoration: none;
  &:hover {
    color: #40b971;
    text-decoration: underline;
  }
`;
