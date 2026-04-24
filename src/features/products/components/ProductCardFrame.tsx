import styled, { css } from 'styled-components';

export const ProductCardFrame = styled.article<{ $highlighted?: boolean }>`
  border-radius: 14px;
  padding: 12px;
  background: #fff;
  transition: border-color 0.15s ease, background-color 0.15s ease;
  border: 1px solid ${({ theme }) => theme.color.surfaceBorder};

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding: 16px;
  }

  ${({ $highlighted, theme }) =>
    $highlighted &&
    css`
      border-color: ${theme.color.successBorder};
      background: ${theme.color.successSoft};
    `}
`;
