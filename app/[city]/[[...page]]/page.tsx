import { notFound } from "next/navigation";
import { HomePage } from "@/components/pages/home-page";
import { CarsPage } from "@/components/pages/cars-page";
import { DetailingPage } from "@/components/pages/detailing-page";
import { ThankYouPage } from "@/components/pages/thank-you-page";

const VALID_CITIES = ["almaty", "astana"] as const;

type City = (typeof VALID_CITIES)[number];

interface PageParams {
  city: string;
  page?: string[];
}

function isValidCity(city: string): city is City {
  return (VALID_CITIES as readonly string[]).includes(city);
}

export function generateStaticParams(): { city: City; page: string[] }[] {
  const pages: string[][] = [[], ["cars"], ["detailing"], ["thankyou"]];
  return VALID_CITIES.flatMap((city) =>
    pages.map((page) => ({ city, page }))
  );
}

export default function CityPage({ params }: { params: PageParams }) {
  const { city, page } = params;

  if (!isValidCity(city)) {
    notFound();
  }

  const slug = page ?? [];

  if (slug.length === 0) {
    return <HomePage />;
  }

  if (slug.length === 1) {
    if (slug[0] === "cars") {
      return <CarsPage />;
    }
    if (slug[0] === "detailing") {
      return <DetailingPage />;
    }
    if (slug[0] === "thankyou") {
      return <ThankYouPage />;
    }
  }

  notFound();
}
