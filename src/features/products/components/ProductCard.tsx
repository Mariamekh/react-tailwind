import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  CompareIcon,
  EditIcon,
  FuelIcon,
  GearIcon,
  HeartIcon,
  SpeedIcon,
  FlameIcon,
  ShieldCheckIcon,
  HistoryIcon,
  GeorgiaFlag,
} from "@/shared/icons";
import { formatMileage, formatPrice, formatTimeAgo } from "@/lib/format";
import type { Product } from "../types";
import { ProductCardPhoto } from "./ProductCardPhoto";
import { useManufacturers } from "@/features/filters/hooks/useManufacturers";
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
  const title = `${manName} ${product.car_model}`.trim();

  const isRustavi =
    product.location_id === 17 || /რუსთავი/.test(product.location_name ?? "");
  const isCustomsNotPassed = product.customs_passed === 0;

  const currencySymbol = product.currency_id === 2 ? "$" : "₾";
  const priceValue = product.price_value || product.price;
  const installment = Math.round((priceValue / 60) * 1.5);

  const hasChips = product.vip === 3;
  const timeAgo = formatTimeAgo(product.order_date);

  return (
    <ProductCardFrame highlighted={hasChips} className="cursor-pointer">
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <ProductCardPhoto
          product={product}
          title={title}
          topLeftContent={
            product.vip > 0 ? (
              <span className="md:hidden">
                <VipBadge level={product.vip} />
              </span>
            ) : null
          }
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
                {product.vip > 0 && (
                  <span className="hidden md:inline-flex">
                    <VipBadge level={product.vip} />
                  </span>
                )}
                {isNewListing(product.order_date) && (
                  <span className="inline-flex h-[22px] items-center rounded-[5px] bg-accent-new px-1.5 text-[11px] font-bold text-white">
                    ახალი
                  </span>
                )}
                <h3 className="truncate text-[15px] font-semibold text-ink md:text-[16px]">
                  <span className="uppercase">{manName}</span>{" "}
                  <span>{product.car_model}</span>
                </h3>
                <span className="shrink-0 text-[13px] text-ink-muted md:text-[14px]">
                  {product.prod_year} წ
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1 text-right">
              {isCustomsNotPassed && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-accent-danger">
                  <span className="text-[10px]">განბაჟება</span>
                  <span className="text-[11px]">{formatPrice(2176)} ₾</span>
                </span>
              )}
              <div className="flex items-center gap-1 text-[12px] text-ink-muted">
                {isRustavi ? (
                  <>
                    <GeorgiaFlag className="h-4 w-4" />
                    <span>რუსთავის ავტო.</span>
                  </>
                ) : product.location_name ? (
                  <>
                    <GeorgiaFlag className="h-4 w-4" />
                    <span>{product.location_name}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-ink-soft md:grid-cols-[1fr_1fr_auto] md:items-center md:text-[13.5px]">
            <div className="inline-flex items-center gap-1.5">
              <FuelIcon className="h-4 w-4 text-ink-muted" />
              <span>
                {product.engine_volume
                  ? (product.engine_volume / 1000).toFixed(1)
                  : "—"}{" "}
                დატ. {product.fuel_type ?? "ბენზინი"}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <SpeedIcon className="h-4 w-4 text-ink-muted" />
              <span>{formatMileage(product.car_run_km)}</span>
            </div>

            <div className="inline-flex items-center gap-1.5">
              <GearIcon className="h-4 w-4 text-ink-muted" />
              <span>{product.gear_type ?? "ავტომატიკა"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <span className="text-ink-muted">●</span>
              <span>{product.drive_type ?? "მარცხენა"}</span>
            </div>

            <div className="col-span-2 mt-1 flex items-center justify-between md:col-auto md:row-span-2 md:mt-0 md:flex-col md:items-end md:justify-between md:text-right">
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

          <div className="mt-3 flex items-center justify-between border-t border-surface-border pt-2.5">
            <div className="flex items-center gap-3 text-[12px] text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <FlameIcon className="h-3.5 w-3.5 text-brand-orange" />
                {product.views ?? 0} ნახვა
              </span>
              {timeAgo && <span>• {timeAgo}</span>}
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
          <span className="inline-flex items-center gap-1">
            <FlameIcon className="h-3.5 w-3.5 text-brand-orange" />
            სასწრაფოდ
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-success-200" />
            იდეალურ მდგომარეობაში
          </span>
          <span className="inline-flex items-center gap-1">
            <HistoryIcon className="h-3.5 w-3.5 text-ink-muted" />
            სუფთა ისტორია
          </span>
        </div>
      )}
    </ProductCardFrame>
  );
}

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

function isNewListing(orderDate: string | undefined) {
  if (!orderDate) return false;
  const t = Date.parse(orderDate);
  if (!Number.isFinite(t)) return false;
  return Date.now() - t < 1000 * 60 * 60 * 24 * 2;
}
