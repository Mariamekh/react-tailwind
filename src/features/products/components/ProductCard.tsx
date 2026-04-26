import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  CompareIcon,
  EditIcon,
  HeartIcon,
  FlameIcon,
  ShieldCheckIcon,
  HistoryIcon,
  GeorgiaFlag,
  USAFlag,
  EngineIcon,
  TransmissionIcon,
  MileageIcon,
  DriveWheelIcon,
  CheckmarkCircleIcon,
  ListIcon,
} from "@/shared/icons";
import { useFiltersStore } from "@/features/filters/store/useFiltersStore";
import { formatMileage, formatPrice, formatTimeAgo } from "@/lib/format";
import type { Product } from "../types";
import { ProductCardPhoto } from "./ProductCardPhoto";
import { useManufacturers } from "@/features/filters/hooks/useManufacturers";
import { useLocationName } from "@/features/filters/hooks/useLocations";
import { VipBadge } from "./VipBadge";
import { ProductCardFrame } from "./ProductCardFrame";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { data: mans } = useManufacturers();
  const [favorite, setFavorite] = useState(false);

  const manName =
    mans?.find((m) => String(m.man_id) === String(product.man_id))?.man_name ??
    "";
  const modelLabel = product.car_model ?? "";
  const title = `${manName} ${modelLabel}`.trim();

  const isCustomsPassed = product.customs_passed === true;
  const { name: lookedUpLocationName, flag: locationFlag } = useLocationName(
    product.location_id,
  );
  const locationLabel = resolveLocationLabel(
    product,
    isCustomsPassed,
    lookedUpLocationName,
    locationFlag,
  );

  const filterCurrency = useFiltersStore((s) => s.currency);
  const customsCurrencySymbol = filterCurrency === 2 ? "$" : "₾";
  const customsFee = 2176;

  const currencySymbol = product.currency_id === 2 ? "$" : "₾";
  const priceValue = product.price_value || product.price;
  const installment = Math.round((priceValue / 60) * 1.5);

  const vipLevel = toVipLevel(product.order_number);
  const stickerChips = decodeStickers(product.stickers)
    .map((id) => STICKER_INFO[id])
    .filter((info): info is StickerInfo => info != null);
  const hasChips = stickerChips.length > 0;
  const isHighlighted = product.prom_color > 0;
  const isCommercialDealer =
    (product.user_type === 1 || product.user_type === 2) &&
    product.dealer_title.trim().length > 0;
  const timeAgo = formatTimeAgo(product.order_date);

  return (
    <ProductCardFrame
      highlighted={isHighlighted}
      bordered={isCommercialDealer}
      className="cursor-pointer"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <ProductCardPhoto
          product={product}
          title={title}
          topLeftContent={null}
          topRightContent={
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFavorite((v) => !v);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-ink-soft shadow-sm hover:text-accent-danger md:hidden"
              aria-label="favorite"
            >
              <HeartIcon
                className={cn(
                  "h-4 w-4",
                  favorite && "fill-accent-danger text-accent-danger",
                )}
              />
            </button>
          }
        />

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-sans text-[14px] font-medium leading-none text-ink-strong">
                  <span className="uppercase">{manName}</span>
                  {modelLabel && <span>{" "}{modelLabel}</span>}
                </h3>
                <span className="shrink-0 font-sans text-[14px] font-medium leading-none text-ink-muted">
                  {product.prod_year} წ
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 text-right">
              {isCustomsPassed ? (
                <span className="inline-flex items-center gap-1 font-sans text-[11px] font-medium leading-none text-success-500">
                  <CheckmarkCircleIcon className="h-4 w-4" />
                  განბაჟებული
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-sans text-[11px] font-medium leading-none text-accent-danger">
                  <span>განბაჟება</span>
                  <span>
                    {formatPrice(customsFee)} {customsCurrencySymbol}
                  </span>
                </span>
              )}
              {locationLabel && (
                <div className="inline-flex items-center gap-1 font-sans text-[11px] font-medium leading-none text-ink-strong">
                  {locationFlag === 'georgia' && (
                    <GeorgiaFlag className="h-4 w-4 shrink-0" />
                  )}
                  {locationFlag === 'usa' && (
                    <USAFlag className="h-4 w-4 shrink-0" />
                  )}
                  <span>{locationLabel}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 font-sailec text-[12px] font-medium text-ink md:w-[396px] md:shrink-0">
              <div className="inline-flex items-center gap-3">
                <EngineIcon className="h-4 w-4 shrink-0 text-ink-icon" />
                <span>
                  {product.engine_volume
                    ? (product.engine_volume / 1000).toFixed(1)
                    : "—"}{" "}
                  დატ. {product.fuel_type ?? "ბენზინი"}
                </span>
              </div>
              <div className="inline-flex items-center gap-3">
                <MileageIcon className="h-4 w-4 shrink-0 text-ink-icon" />
                <span>{formatMileage(product.car_run_km)}</span>
              </div>
              <div className="inline-flex items-center gap-3">
                <TransmissionIcon className="h-4 w-4 shrink-0 text-ink-icon" />
                <span>{product.gear_type ?? "ავტომატიკა"}</span>
              </div>
              <div className="inline-flex items-center gap-3">
                <DriveWheelIcon className="h-4 w-4 shrink-0 text-ink-icon" />
                <span>{product.drive_type ?? "მარცხენა"}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between md:ml-auto md:mt-0 md:flex-col md:items-end md:justify-center md:text-right">
              <div className="text-[12px] text-ink-muted md:hidden">
                {product.views ?? 0} ნახვა{timeAgo && ` • ${timeAgo}`}
              </div>
              <div className="flex flex-col items-end">
                <div className="text-[20px] font-extrabold leading-none text-ink md:text-[22px]">
                  {formatPrice(priceValue)}
                  <span className="ml-1 text-[14px] font-semibold text-ink-soft">
                    {currencySymbol}
                  </span>
                </div>
                {product.currency_id === 2 && (
                  <div className="text-[11px] text-ink-muted">
                    განვადება {formatPrice(installment)} ₾
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[12px] text-ink-muted">
              {vipLevel > 0 && <VipBadge level={vipLevel} />}
              <div className="flex items-center gap-1">
                <span>{product.views ?? 0} ნახვა</span>
                {timeAgo && (
                  <>
                    <span>•</span>
                    <span>{timeAgo}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-ink-muted">
              <IconBtn title="edit">
                <EditIcon className="h-4 w-4" />
              </IconBtn>
              <IconBtn title="compare">
                <CompareIcon className="h-4 w-4" />
              </IconBtn>
              <IconBtn title="favorite" onClick={() => setFavorite((v) => !v)}>
                <HeartIcon
                  className={cn(
                    "h-4 w-4",
                    favorite && "fill-accent-danger text-accent-danger",
                  )}
                />
              </IconBtn>
            </div>
          </div>
        </div>
      </div>

      {hasChips && (
        <div className="-mx-3 mt-3 flex flex-wrap items-center gap-3 border-t border-success-150 px-3 pt-3 text-[12px] text-ink-soft md:-mx-4 md:px-4">
          {stickerChips.map((info, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <info.Icon className={cn("h-3.5 w-3.5", info.iconClass)} />
              {info.label}
            </span>
          ))}
        </div>
      )}

      {isCommercialDealer && (
        <DealerFooter
          name={product.dealer_title}
          listingCount={product.active_ads}
        />
      )}
    </ProductCardFrame>
  );
}

function DealerFooter({
  name,
  listingCount,
}: {
  name: string;
  listingCount: number | null;
}) {
  return (
    <div className="-mx-3 mt-3 flex flex-col gap-1 border-t border-surface-border px-3 pt-3 md:-mx-4 md:px-4">
      <span className="truncate text-[13px] font-medium text-ink-strong">
        {name}
      </span>
      <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
        <ListIcon className="h-3.5 w-3.5" />
        ყველა განცხადება
        {typeof listingCount === "number" ? ` (${listingCount})` : ""}
      </span>
    </div>
  );
}

function toVipLevel(orderNumber: number | undefined): 0 | 1 | 2 | 3 {
  if (!orderNumber || orderNumber <= 0) return 0;
  if (orderNumber >= 20) return 3;
  if (orderNumber >= 15) return 2;
  if (orderNumber >= 10) return 1;
  return 0;
}

const STICKER_PRIMES = [
  3, 5, 7, 11, 17, 19, 23, 29, 31, 47, 53, 59, 61, 67, 71, 73, 79,
];

function decodeStickers(value: number | null | undefined): number[] {
  if (!value || value <= 1) return [];
  const ids: number[] = [];
  let remaining = value;
  for (const prime of STICKER_PRIMES) {
    while (remaining % prime === 0) {
      ids.push(prime);
      remaining = remaining / prime;
      if (remaining === 1) return ids;
    }
  }
  return ids;
}

type StickerIcon = typeof FlameIcon;
type StickerInfo = { label: string; Icon: StickerIcon; iconClass: string };

const STICKER_INFO: Record<number, StickerInfo> = {
  3: { label: "დაურტყმელი", Icon: ShieldCheckIcon, iconClass: "text-success-200" },
  5: { label: "სუფთა ისტორიით", Icon: HistoryIcon, iconClass: "text-ink-muted" },
  7: { label: "ახალი ჩამოყვანილი", Icon: CheckmarkCircleIcon, iconClass: "text-success-500" },
  17: { label: "შეუღებავი", Icon: CheckmarkCircleIcon, iconClass: "text-success-500" },
  23: { label: "სასწრაფოდ", Icon: FlameIcon, iconClass: "text-brand-orange" },
  29: { label: "ევროპიდან", Icon: CheckmarkCircleIcon, iconClass: "text-success-500" },
  31: { label: "იდეალურ მდგომარეობაში", Icon: ShieldCheckIcon, iconClass: "text-success-200" },
  47: { label: "ამერიკიდან", Icon: CheckmarkCircleIcon, iconClass: "text-success-500" },
  71: { label: "ცენტრის გარანტიით", Icon: ShieldCheckIcon, iconClass: "text-success-200" },
};

function IconBtn({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink"
    >
      {children}
    </button>
  );
}

const USA_LOC_ID = 21;
const IN_TRANSIT_LOC_ID = 23;

function resolveLocationLabel(
  product: Product,
  _customsPassed: boolean,
  lookedUpName: string | undefined,
  flag: 'georgia' | 'usa' | null,
): string {
  if (product.location_id === USA_LOC_ID) return 'ა.შ.შ.';
  if (product.location_id === IN_TRANSIT_LOC_ID) return 'გზაში';
  if (flag === 'georgia') return 'საქართველო';

  const name = lookedUpName ?? product.location_name;
  return name ?? '';
}
