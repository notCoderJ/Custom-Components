import { css } from 'styled-components';

export const sizeStyle = css`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};
  `}
`;

export const colorStyle = css`
  ${({ theme, color }) => css`
    border: inset 3px ${theme.palette[color]};
    background-color: ${theme.palette[color]};
  `}
`;

export const initBtnStyle = css`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
