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
  const { flag: locationFlag } = useLocationName(product.location_id);
  const locationLabel = resolveLocationLabel(product, locationFlag);

  const filterCurrency = useFiltersStore((s) => s.currency);
  const customsCurrencySymbol = filterCurrency === 2 ? "$" : "₾";
  const customsFee = 2176;

  const priceValue = product.price_value || product.price;

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
                <div className="flex items-center gap-1 font-sailec text-[20px] font-medium leading-none text-ink-strong">
                  <span>{formatPrice(priceValue)}</span>
                  <span className="inline-flex h-6 w-[26px] items-center justify-center rounded-[12px] bg-surface-tint text-ink-strong">
                    {filterCurrency === 2 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                      >
                        <path
                          d="M5.71 11V9.86c1.07-.07 1.93-.36 2.59-.86.65-.5.98-1.18.98-2.05 0-.59-.13-1.08-.4-1.47-.26-.39-.62-.7-1.07-.93-.45-.23-.95-.42-1.5-.56l-.6-.16V1.96c.36.05.66.16.91.32.25.16.43.36.55.6h2.13C9.14 1.92 8.7 1.36 8.07.96 7.45.55 6.66.31 5.71.23V0H4.4v.23C3.36.31 2.51.6 1.86 1.1c-.65.5-.97 1.16-.97 2 0 .54.13.99.39 1.36.26.36.6.66 1.04.88.43.22.91.4 1.43.54l.65.18v2.06c-.4-.06-.74-.18-1-.36-.27-.18-.45-.4-.56-.66H.65c.1.94.55 1.69 1.34 2.24.79.55 1.6.83 2.41.86V11h1.31zM4.4 4.13l-.4-.13c-.39-.13-.7-.28-.92-.46-.22-.18-.33-.4-.33-.66 0-.32.13-.58.4-.79.26-.21.69-.34 1.25-.4v2.44zm1.31 1.6.4.12c.46.13.81.29 1.05.5.24.2.36.46.36.78 0 .35-.14.63-.42.85-.28.22-.74.36-1.39.43V5.73z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                      >
                        <path
                          d="M8.91433 11V9.32231H5.25111C4.6258 9.32231 4.07804 9.1699 3.60783 8.86508C3.13762 8.56026 2.7745 8.13064 2.51846 7.57621C2.26243 7.02178 2.13442 6.37974 2.13442 5.6501C2.13442 4.85806 2.24889 4.20042 2.47784 3.67719C2.70679 3.15396 3.0773 2.74834 3.58937 2.46032V5.80851H4.48301V2.19391C4.63072 2.16511 4.79074 2.15071 4.96307 2.15071C5.13048 2.15071 5.29788 2.16511 5.46529 2.19391V5.80851H6.35894V2.46032C6.88577 2.74354 7.26366 3.15396 7.49261 3.69159C7.72157 4.22922 7.83604 4.93486 7.83604 5.80851H10C10 4.97326 9.85352 4.20402 9.56056 3.50078C9.2676 2.79754 8.84663 2.20231 8.29764 1.71508C7.74865 1.22785 7.10241 0.890634 6.35894 0.703424V0H5.46529V0.545015L5.22895 0.537815C5.17479 0.533014 5.09601 0.530614 4.99261 0.530614C4.7612 0.530614 4.59133 0.535415 4.48301 0.545015V0H3.58937V0.703424C2.87051 0.890634 2.24028 1.21585 1.69867 1.67908C1.15707 2.1423 0.738552 2.69554 0.443131 3.33877C0.147711 3.98201 0 4.65885 0 5.36929C0 5.91652 0.0763171 6.44935 0.228951 6.96777C0.381585 7.4862 0.605613 7.95063 0.901034 8.36105C1.19646 8.77148 1.5485 9.09189 1.95716 9.32231V9.37991H0.546529V11H8.91433Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-4 font-sans text-[12px] font-normal leading-none text-ink-medium">
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
  flag: 'georgia' | 'usa' | null,
): string {
  if (product.location_id === USA_LOC_ID) return 'ა.შ.შ.';
  if (product.location_id === IN_TRANSIT_LOC_ID) return 'გზაში';
  if (flag === 'georgia') return 'საქართველო';
  return product.location_name ?? '';
}
