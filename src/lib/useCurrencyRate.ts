import { useQuery } from '@tanstack/react-query';

interface NbgCurrency {
  code: string;
  rate: number;
  quantity: number;
}

interface NbgResponse {
  currencies: NbgCurrency[];
}

const NBG_URL = 'https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/';

const FALLBACK_GEL_PER_USD = 2.7;

async function fetchGelPerUsd(): Promise<number> {
  const res = await fetch(NBG_URL);
  if (!res.ok) throw new Error(`NBG ${res.status}`);
  const data = (await res.json()) as NbgResponse[];
  const usd = data[0]?.currencies?.find((c) => c.code === 'USD');
  if (!usd) throw new Error('USD rate not in NBG response');
  return usd.rate / (usd.quantity || 1);
}

export function useGelPerUsd(): number {
  const { data } = useQuery({
    queryKey: ['nbg-gel-per-usd'],
    queryFn: fetchGelPerUsd,
    staleTime: 6 * 60 * 60 * 1000,
    retry: 1,
  });
  return data ?? FALLBACK_GEL_PER_USD;
}

export function gelToUsd(gel: number, gelPerUsd: number): number {
  if (!gelPerUsd) return 0;
  return Math.round(gel / gelPerUsd);
}

export function usdToGel(usd: number, gelPerUsd: number): number {
  return Math.round(usd * gelPerUsd);
}
