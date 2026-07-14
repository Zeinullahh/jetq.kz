"use client";

import { useMemo, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import {
  DEFAULT_FILTERS,
  applyFilters,
  buildFilterOptions,
  countActiveFilters,
  getAvailableModels,
  FilterState,
} from "@/lib/car-filters";
import { CarStockItem } from "@/lib/car-stock-types";

const COLOR_LABELS: Record<string, string> = {
  Black: "Чёрный",
  Gray: "Серый",
  Green: "Зелёный",
  Red: "Красный",
  White: "Белый",
  Blue: "Синий",
};

interface ChipGroupProps {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
  labelMap?: Record<string, string>;
}

function ChipGroup({
  label,
  values,
  selected,
  onToggle,
  labelMap = {},
}: ChipGroupProps) {
  if (values.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const isActive = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              className={`rounded-sm border px-3 py-1.5 text-xs uppercase tracking-wide transition-colors ${
                isActive
                  ? "border-gold bg-gold text-black"
                  : "border-border bg-muted/50 text-card-foreground hover:border-gold"
              }`}
            >
              {labelMap[value] || value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CarFiltersProps {
  cars: CarStockItem[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function CarFilters({ cars, filters, onChange }: CarFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const options = useMemo(() => buildFilterOptions(cars), [cars]);
  const activeCount = useMemo(
    () => countActiveFilters(filters),
    [filters]
  );
  const filteredCount = useMemo(
    () => applyFilters(cars, filters).length,
    [cars, filters]
  );
  const availableModels = useMemo(
    () => getAvailableModels(options, filters.brand),
    [options, filters.brand]
  );

  function toggleBrand(brand: string) {
    const nextBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    const allowedModels = new Set(getAvailableModels(options, nextBrands));
    const nextModels = filters.model.filter((m) => allowedModels.has(m));
    onChange({ ...filters, brand: nextBrands, model: nextModels });
  }

  function toggleModel(model: string) {
    const nextModels = filters.model.includes(model)
      ? filters.model.filter((m) => m !== model)
      : [...filters.model, model];
    onChange({ ...filters, model: nextModels });
  }

  function toggleArray<K extends keyof FilterState>(key: K, value: string) {
    const arr = filters[key];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next });
  }

  function reset() {
    onChange({ ...DEFAULT_FILTERS });
  }

  function removeFilter(type: keyof FilterState, value: string) {
    if (type === "brand") toggleBrand(value);
    else if (type === "model") toggleModel(value);
    else if (value) toggleArray(type, value);
  }

  const activeChips: { type: keyof FilterState; value: string; label: string }[] =
    [];
  filters.brand.forEach((v) =>
    activeChips.push({ type: "brand", value: v, label: v })
  );
  filters.model.forEach((v) =>
    activeChips.push({ type: "model", value: v, label: v })
  );
  filters.colors.forEach((v) =>
    activeChips.push({
      type: "colors",
      value: v,
      label: COLOR_LABELS[v] || v,
    })
  );
  filters.years.forEach((v) =>
    activeChips.push({ type: "years", value: v, label: v })
  );
  filters.batteries.forEach((v) =>
    activeChips.push({ type: "batteries", value: v, label: v })
  );

  const filterContent = (
    <div className="flex flex-col gap-5">
      <ChipGroup
        label="Марка"
        values={options.brands}
        selected={filters.brand}
        onToggle={toggleBrand}
      />

      {filters.brand.length > 0 && (
        <ChipGroup
          label="Модель"
          values={availableModels}
          selected={filters.model}
          onToggle={toggleModel}
        />
      )}

      <ChipGroup
        label="Год"
        values={options.years}
        selected={filters.years}
        onToggle={(value) => toggleArray("years", value)}
      />

      <ChipGroup
        label="Цвет кузова"
        values={options.colors}
        selected={filters.colors}
        labelMap={COLOR_LABELS}
        onToggle={(value) => toggleArray("colors", value)}
      />

      {options.batteries.length > 0 && (
        <ChipGroup
          label="Батарея"
          values={options.batteries}
          selected={filters.batteries}
          onToggle={(value) => toggleArray("batteries", value)}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
        <p className="text-sm text-card-foreground">
          Найдено:{" "}
          <span className="font-medium text-gold">{filteredCount}</span> авто
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm uppercase tracking-wide text-muted-foreground transition-colors hover:text-gold"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center gap-2 border border-border bg-muted px-4 py-2.5 text-sm uppercase tracking-wide text-card-foreground transition-colors hover:border-gold"
        >
          <SlidersHorizontal size={16} />
          Фильтры
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold px-1 text-xs font-medium text-black">
              {activeCount}
            </span>
          )}
        </button>
        <p className="text-sm text-card-foreground">
          Найдено:{" "}
          <span className="font-medium text-gold">{filteredCount}</span>
        </p>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "mt-4 max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border border-border bg-card p-4">{filterContent}</div>
      </div>

      <div className="hidden border border-border bg-card p-5 lg:block">
        {filterContent}
      </div>

      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <button
              key={`${chip.type}-${chip.value}`}
              type="button"
              onClick={() => removeFilter(chip.type, chip.value)}
              className="flex items-center gap-1.5 rounded-sm bg-gold px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-black transition-colors hover:bg-dark-gold"
            >
              {chip.label}
              <X size={12} strokeWidth={3} />
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="rounded-sm border border-border px-3 py-1.5 text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:border-gold"
          >
            Очистить
          </button>
        </div>
      )}
    </div>
  );
}
