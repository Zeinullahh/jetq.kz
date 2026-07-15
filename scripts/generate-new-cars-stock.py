#!/usr/bin/env python3
"""Generate lib/new-cars-stock.ts from the three Google Sheets CSV exports."""

import csv
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_PATH = ROOT / "lib" / "new-cars-stock.ts"

SHEET_URLS = {
    "sheet1.csv": "https://docs.google.com/spreadsheets/d/16qcZ9vlwllGksU4U3CWyVKwwrllvvokv8oAW7KEqUVw/export?format=csv&gid=784591598",
    "sheet2.csv": "https://docs.google.com/spreadsheets/d/16qcZ9vlwllGksU4U3CWyVKwwrllvvokv8oAW7KEqUVw/export?format=csv&gid=682906171",
    "sheet3.csv": "https://docs.google.com/spreadsheets/d/16qcZ9vlwllGksU4U3CWyVKwwrllvvokv8oAW7KEqUVw/export?format=csv&gid=1578108247",
}

KNOWN_BRANDS = ["Lynk & Co", "ZEEKR", "Toyota", "BYD"]

# Some cells use an old/export name in the Russian line while the site
# (and photos) use a different canonical name. Map full-model patterns to
# canonical (brand, model) pairs.
MODEL_OVERRIDES = {
    "BYD LEOPARD 7 190 KM 4WD Ultra, 2025": ("BYD", "7 190 KM 4WD Ultra, 2025"),
}

COLOR_MAP = [
    ("золотистый", "Gold"),
    ("горный зел", "Green"),
    ("зелёный", "Green"),
    ("зеленый", "Green"),
    ("бежевый", "Beige"),
    ("янтарно-корич", "Brown"),
    ("коричневый", "Brown"),
    ("облачно-оранж", "Orange"),
    ("оранжевый", "Orange"),
    ("алый", "Red"),
    ("красный", "Red"),
    ("лунно-син", "Blue"),
    ("синий", "Blue"),
    ("лунно-морской", "Gray"),
    ("кибер-сер", "Gray"),
    ("морозно-сер", "Gray"),
    ("снежно-сер", "Gray"),
    ("серебристый", "Gray"),
    ("серый", "Gray"),
    ("обсидианово-чёрный", "Black"),
    ("звёздно-чёрный", "Black"),
    ("чистый чёрный", "Black"),
    ("чёрный", "Black"),
    ("черный", "Black"),
    ("снежно-бел", "White"),
    ("белый", "White"),
]


def slugify(text: str) -> str:
    s = re.sub(r"[^\w\s-]", "", text).strip().lower()
    return re.sub(r"[-\s]+", "-", s)


def normalize(value: str) -> str:
    if not value:
        return ""
    return " ".join(value.replace("\r", "\n").split())


def extract_russian(value: str) -> str:
    if not value:
        return ""
    parts = [p.strip() for p in value.replace("\r", "\n").split("\n") if p.strip()]
    if len(parts) >= 2:
        return parts[1]
    return parts[0] if parts else value.strip()


def clean_price(value: str) -> str:
    return normalize(value)


def extract_brand_model(full: str):
    full = normalize(full)
    if full in MODEL_OVERRIDES:
        return MODEL_OVERRIDES[full]
    for brand in KNOWN_BRANDS:
        if full.lower().startswith(brand.lower()):
            remainder = full[len(brand):].strip()
            return brand, remainder
    parts = full.split(None, 1)
    return parts[0], (parts[1] if len(parts) > 1 else "")


def fetch_csvs():
    for filename, url in SHEET_URLS.items():
        dest = ROOT / filename
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; jetq-bot/1.0)"},
        )
        with urllib.request.urlopen(req, timeout=60) as response, open(dest, "wb") as out:
            out.write(response.read())
        print(f"Downloaded {filename}")


def remove_csvs():
    for filename in SHEET_URLS:
        path = ROOT / filename
        if path.exists():
            path.unlink()
            print(f"Removed {filename}")


def extract_color_category(raw_color: str) -> str:
    if not raw_color:
        return ""
    lowered = raw_color.lower()
    for needle, category in COLOR_MAP:
        if needle in lowered:
            return category
    return ""


# Explicit image filename overrides for cars whose photo names do not
# follow the default slugified convention.
IMAGE_OVERRIDES = {
    ("BYD", "7 190 KM 4WD Ultra, 2025"): {
        "Black": "/images/cars/BYD_7_190_KM_4WD_Ultra_2025_Black.jpg",
        "Gray": "/images/cars/BYD_7_190_KM_4WD_Ultra_2025_Gray.jpg",
        "Green": "/images/cars/BYD_7_190_KM_4WD_Ultra_2025_Green.png",
    }
}


def image_path_for(brand: str, model: str, color: str) -> str:
    """Map a car to the photo filename used by the site.

    The model string already contains the year in this sheet, so we do not
    append the year separately. "&" is expanded to "and" to match the
    restored photo filenames (e.g. lynk-and-co-900-...jpg).
    """
    override = IMAGE_OVERRIDES.get((brand, model), {}).get(color)
    if override:
        return override
    slug = slugify(f"{brand} {model} {color}".replace("&", "and"))
    return f"/images/cars/{slug}.jpg"


def parse_sheet1(path: Path, category: str):
    cars = []
    with open(path, "r", encoding="utf-8") as f:
        rows = list(csv.reader(f))

    data_rows = rows[3:]

    for idx, row in enumerate(data_rows, start=1):
        if not row or not row[0].strip():
            continue
        model_full = extract_russian(row[0])
        if not model_full:
            continue

        brand, model = extract_brand_model(model_full)
        if not brand:
            continue

        year_raw = row[2].strip()
        try:
            year = int(year_raw)
        except ValueError:
            year = 0

        exterior = extract_russian(row[3])
        interior = extract_russian(row[4])
        configuration = extract_russian(row[5])
        location = extract_russian(row[6]) if len(row) > 6 else ""
        exw = clean_price(row[7]) if len(row) > 7 else ""
        notes = extract_russian(row[8]) if len(row) > 8 else ""
        color_category = extract_color_category(exterior)

        car = {
            "id": slugify(f"{category}-{brand}-{model}-{idx}"),
            "brand": brand,
            "model": model,
            "fullModel": model_full,
            "year": year,
            "price": clean_price(row[1]),
            "exteriorColor": exterior,
            "interiorColor": interior,
            "colorCategory": color_category,
            "configuration": configuration,
            "location": location,
            "exwPrice": exw,
            "notes": notes,
            "battery": "",
            "wheels": "",
            "packages": "",
            "image": image_path_for(brand, model, color_category),
            "category": category,
        }
        cars.append(car)
    return cars


def parse_sheet2(path: Path, category: str):
    cars = []
    with open(path, "r", encoding="utf-8") as f:
        rows = list(csv.reader(f))

    data_rows = rows[2:]

    for idx, row in enumerate(data_rows, start=1):
        if not row or not row[0].strip():
            continue
        trim = normalize(row[0])
        if "ZEEKR 8X на стоке" in trim or "Примечание" in trim or "Пакет" in trim:
            continue
        if trim not in {"Max", "Ultra+", "Ultra"}:
            continue

        model = f"ZEEKR 8X {trim}"
        brand = "ZEEKR"
        battery = normalize(row[1]) if len(row) > 1 else ""
        exterior = normalize(row[2]) if len(row) > 2 else ""
        interior = normalize(row[3]) if len(row) > 3 else ""
        wheels = normalize(row[4]) if len(row) > 4 else ""
        packages = normalize(row[5]) if len(row) > 5 else ""
        matte_yuan = clean_price(row[6]) if len(row) > 6 else ""
        matte_usd = clean_price(row[7]) if len(row) > 7 else ""
        night_yuan = clean_price(row[8]) if len(row) > 8 else ""
        night_usd = clean_price(row[9]) if len(row) > 9 else ""

        price_parts = []
        if matte_usd:
            price_parts.append(f"Матовый: {matte_usd}")
        if night_usd:
            price_parts.append(f"Ночной: {night_usd}")
        exw = "; ".join(price_parts) if price_parts else (matte_usd or night_usd or "")
        color_category = extract_color_category(exterior)

        car = {
            "id": slugify(f"{category}-{brand}-{trim}-{idx}"),
            "brand": brand,
            "model": f"8X {trim}",
            "fullModel": model,
            "year": 2026,
            "price": "",
            "exteriorColor": exterior,
            "interiorColor": interior,
            "colorCategory": color_category,
            "configuration": "",
            "location": "Нинбо",
            "exwPrice": exw,
            "notes": "",
            "battery": battery,
            "wheels": wheels,
            "packages": packages,
            "image": image_path_for(brand, f"8X {trim}", color_category),
            "category": category,
        }
        cars.append(car)
    return cars


def parse_sheet3(path: Path, category: str):
    return parse_sheet1(path, category)


def build_ts(cars: list[dict]) -> str:
    lines = [
        'import { CarStockItem } from "./car-stock-types";',
        "",
        "export const newCarStock: CarStockItem[] = [",
    ]

    for car in cars:
        lines.append("  {")
        for key, value in car.items():
            if key == "year":
                lines.append(f"    {key}: {int(value)},")
            else:
                text = normalize(str(value))
                escaped = text.replace("\\", "\\\\").replace('"', '\\"')
                lines.append(f'    {key}: "{escaped}",')
        lines.append("  },")

    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def main():
    fetch_csvs()

    sheet1 = ROOT / "sheet1.csv"
    sheet2 = ROOT / "sheet2.csv"
    sheet3 = ROOT / "sheet3.csv"

    cars = []
    cars.extend(parse_sheet1(sheet1, "border-stock"))
    cars.extend(parse_sheet2(sheet2, "zeekr-8x-ningbo"))
    cars.extend(parse_sheet3(sheet3, "lynkco-900"))

    remove_csvs()

    js = build_ts(cars)
    OUT_PATH.write_text(js, encoding="utf-8")
    print(f"Wrote {len(cars)} cars to {OUT_PATH}")


if __name__ == "__main__":
    main()
