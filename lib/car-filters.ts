import { CarStockItem } from "./car-stock-types";

export interface FilterState {
  brand: string[];
  model: string[];
  colors: string[];
  years: string[];
  locations: string[];
  batteries: string[];
}

export interface FilterOptions {
  brands: string[];
  modelsByBrand: Record<string, string[]>;
  colors: string[];
  years: string[];
  locations: string[];
  batteries: string[];
}

export const DEFAULT_FILTERS: FilterState = {
  brand: [],
  model: [],
  colors: [],
  years: [],
  locations: [],
  batteries: [],
};

export function buildFilterOptions(cars: CarStockItem[]): FilterOptions {
  const brandsSet = new Set<string>();
  const modelsByBrand: Record<string, Set<string>> = {};
  const colorsSet = new Set<string>();
  const yearsSet = new Set<string>();
  const locationsSet = new Set<string>();
  const batteriesSet = new Set<string>();

  for (const car of cars) {
    if (car.brand) {
      brandsSet.add(car.brand);
      if (!modelsByBrand[car.brand]) modelsByBrand[car.brand] = new Set();
      if (car.model) modelsByBrand[car.brand].add(car.model);
    }
    if (car.colorCategory) colorsSet.add(car.colorCategory);
    if (car.year) yearsSet.add(String(car.year));
    if (car.location) locationsSet.add(car.location);
    if (car.battery) batteriesSet.add(car.battery);
  }

  return {
    brands: Array.from(brandsSet).sort(),
    modelsByBrand: Object.fromEntries(
      Object.entries(modelsByBrand).map(([brand, set]) => [
        brand,
        Array.from(set).sort(),
      ])
    ),
    colors: Array.from(colorsSet).sort(),
    years: Array.from(yearsSet).sort(),
    locations: Array.from(locationsSet).sort(),
    batteries: Array.from(batteriesSet).sort(),
  };
}

export function applyFilters(
  cars: CarStockItem[],
  filters: FilterState
): CarStockItem[] {
  return cars.filter((car) => {
    if (filters.brand.length > 0 && !filters.brand.includes(car.brand))
      return false;
    if (filters.model.length > 0 && !filters.model.includes(car.model))
      return false;
    if (
      filters.colors.length > 0 &&
      !filters.colors.includes(car.colorCategory)
    )
      return false;
    if (filters.years.length > 0 && !filters.years.includes(String(car.year)))
      return false;
    if (
      filters.locations.length > 0 &&
      !filters.locations.includes(car.location)
    )
      return false;
    if (
      filters.batteries.length > 0 &&
      !filters.batteries.includes(car.battery)
    )
      return false;
    return true;
  });
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.brand.length +
    filters.model.length +
    filters.colors.length +
    filters.years.length +
    filters.locations.length +
    filters.batteries.length
  );
}

export function getAvailableModels(
  options: FilterOptions,
  brand: string[]
): string[] {
  if (!brand || brand.length === 0) return [];
  const set = new Set<string>();
  for (const b of brand) {
    const models = options.modelsByBrand[b];
    if (models) {
      for (const m of models) set.add(m);
    }
  }
  return Array.from(set).sort();
}

export const filterLabels: Record<keyof FilterState, string> = {
  brand: "Марка",
  model: "Модель",
  colors: "Цвет",
  years: "Год",
  locations: "Локация",
  batteries: "Батарея",
};
