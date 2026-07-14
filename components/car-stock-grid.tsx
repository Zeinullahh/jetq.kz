"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { newCarStock } from "@/lib/new-cars-stock";
import { DEFAULT_FILTERS, applyFilters, FilterState } from "@/lib/car-filters";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { MotionCard } from "@/components/motion-card";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { useCity } from "@/components/site-context";
import { CarFilters } from "@/components/car-filters";
import { CarStockItem } from "@/lib/car-stock-types";
import {
  USD_PER_YUAN,
  parseAmount,
  formatUsd,
  isDollar,
  isYuan,
} from "@/lib/car-price-utils";

interface CarStockGridProps {
  id?: string;
  className?: string;
  cars?: CarStockItem[];
}

function useCityLabel() {
  const city = useCity();
  if (city === "astana") return "Астане";
  if (city === "almaty") return "Алматы";
  return "Алматы и Астане";
}

function getCarPrice(car: CarStockItem): string {
  // Always display a USD price. Prefer explicit USD EXW prices,
  // otherwise convert Yuan prices/EXW to USD at the fixed rate.
  if (car.exwPrice) {
    if (isDollar(car.exwPrice)) return car.exwPrice;
    if (isYuan(car.exwPrice))
      return formatUsd(parseAmount(car.exwPrice) * USD_PER_YUAN);
  }
  if (car.price)
    return formatUsd(parseAmount(car.price) * USD_PER_YUAN);
  return car.exwPrice;
}

export function CarStockGrid({
  id,
  className,
  cars = newCarStock,
}: CarStockGridProps) {
  const isTouch = useTouchDevice();
  const cityLabel = useCityLabel();
  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });
  const filteredCars = useMemo(
    () => applyFilters(cars, filters),
    [cars, filters]
  );
  const [columns, setColumns] = useState(3);
  const [visibleCount, setVisibleCount] = useState(columns * 2);

  useEffect(() => {
    function updateColumns() {
      const w = window.innerWidth;
      if (w >= 1024) setColumns(3);
      else if (w >= 640) setColumns(2);
      else setColumns(1);
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    setVisibleCount(columns * 2);
  }, [filters, columns]);

  const displayedCars = useMemo(
    () => filteredCars.slice(0, visibleCount),
    [filteredCars, visibleCount]
  );

  return (
    <section
      id={id}
      className={`bg-background/50 py-20 scroll-mt-24 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <MotionSectionHeader
          title="Авто в наличии"
          subtitle={`Актуальный сток популярных автомобилей из Китая в ${cityLabel}.`}
        />

        <CarFilters cars={cars} filters={filters} onChange={setFilters} />

        {filteredCars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center text-card-foreground"
          >
            <Car size={48} className="text-muted-foreground/30" />
            <h3 className="mt-4 text-xl uppercase tracking-tight">
              Авто не найдены
            </h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              Попробуйте изменить параметры фильтров или сбросить их.
            </p>
            <button
              type="button"
              onClick={() => setFilters({ ...DEFAULT_FILTERS })}
              className="mt-6 border border-border px-6 py-3 text-sm uppercase tracking-wide text-card-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Сбросить фильтры
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 80, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: (index % 6) * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href="#lead-form"
                    aria-label={`Оставить заявку о ${car.fullModel}`}
                    className="block"
                  >
                    <MotionCard
                      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-sm"
                      tilt
                      sheen
                      hoverScale={1.02}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <motion.div
                          className="h-full w-full"
                          whileHover={
                            isTouch ? undefined : { scale: 1.08 }
                          }
                          transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {car.image &&
                          car.image !== "/images/cars/placeholder.svg" ? (
                            <Image
                              src={car.image}
                              alt={car.fullModel}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              priority={index < columns * 2}
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground/50">
                              <Car size={64} strokeWidth={1} />
                              <span className="text-xs uppercase tracking-widest">
                                Фото скоро
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-normal uppercase leading-tight tracking-tight text-card-foreground">
                            {car.fullModel}
                          </h3>
                          {car.year ? (
                            <span className="shrink-0 rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                              {car.year}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4 grid gap-y-2 text-sm text-card-foreground">
                          {car.exteriorColor ? (
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Кузов
                              </span>
                              <span className="text-right">
                                {car.exteriorColor}
                              </span>
                            </div>
                          ) : null}
                          {car.interiorColor ? (
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Салон
                              </span>
                              <span className="text-right">
                                {car.interiorColor}
                              </span>
                            </div>
                          ) : null}
                          {car.battery ? (
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Батарея
                              </span>
                              <span className="text-right">
                                {car.battery}
                              </span>
                            </div>
                          ) : null}
                          {car.location ? (
                            <div className="flex justify-between gap-2">
                              <span className="text-muted-foreground">
                                Локация
                              </span>
                              <span className="text-right">
                                {car.location}
                              </span>
                            </div>
                          ) : null}
                        </div>

                        {car.configuration || car.wheels || car.packages ? (
                          <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
                            {[car.configuration, car.wheels, car.packages]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        ) : null}

                        <div className="mt-auto pt-4">
                          {getCarPrice(car) ? (
                            <p className="text-lg font-medium text-card-foreground">
                              {getCarPrice(car)}
                            </p>
                          ) : null}
                          {car.notes ? (
                            <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">
                              {car.notes}
                            </p>
                          ) : null}
                          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gold">
                            Оставить заявку →
                          </p>
                        </div>
                      </div>
                    </MotionCard>
                  </a>
                </motion.div>
              ))}
            </div>
            {filteredCars.length > visibleCount && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((v) => v + columns * 2)}
                  className="border border-border bg-muted px-8 py-3 text-sm uppercase tracking-wide text-card-foreground transition-colors hover:border-gold"
                >
                  Показать ещё
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
