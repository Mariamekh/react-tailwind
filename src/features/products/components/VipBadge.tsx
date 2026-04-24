import styled, { css } from 'styled-components';

type VipLevel = 1 | 2 | 3;

const labels: Record<VipLevel, string> = {
  1: 'VIP',
  2: 'VIP +',
  3: 'S-VIP',
};

const variantStyles = {
  1: css`
    background: ${({ theme }) => theme.color.vip};
    color: #fff;
  `,
  2: css`
    background: ${({ theme }) => theme.color.vipPlus};
    color: #fff;
  `,
  3: css`
    background: ${({ theme }) => theme.color.superVip};
    color: #fff;
  `,
} as const;

const Badge = styled.span<{ $level: VipLevel }>`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  border-radius: 5px;
  ${({ $level }) => variantStyles[$level]};
`;

export function VipBadge({ level }: { level: number }) {
  if (!level || level < 1 || level > 3) return null;
  const lvl = level as VipLevel;
  return <Badge $level={lvl}>{labels[lvl]}</Badge>;
}
