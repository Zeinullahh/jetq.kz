export interface Address {
  id: string;
  city: "Алматы" | "Астана";
  label: string;
  lines: string[];
  phone: string;
  hours: string;
  coords: { lat: number; lon: number };
  twoGisOrgIds: string[];
}

export const almatyPhone = "+7 (775) 006-14-11";
export const astanaPhone = "+7 (701) 006-37-53";
export const astanaUtmPhone = "+7 (775) 006-14-08";
export const companyPhone = almatyPhone;
export const companyHours = "10:00 – 19:00, ежедневно";

export const addresses: Address[] = [
  {
    id: "almaty-forum",
    city: "Алматы",
    label: "JetQ Auto / Детейлинг",
    lines: ["г. Алматы, ЖК Forum Residence", "ул. Байтурсынова 179/2, блок 2"],
    phone: almatyPhone,
    hours: companyHours,
    coords: { lat: 43.2308809, lon: 76.9345894 },
    twoGisOrgIds: ["70000001104156370"],
  },
  {
    id: "almaty-satpaeva",
    city: "Алматы",
    label: "JetQ Auto",
    lines: ["г. Алматы, улица Каныша Сатпаева, 90/21"],
    phone: almatyPhone,
    hours: companyHours,
    coords: { lat: 43.232119, lon: 76.875055 },
    twoGisOrgIds: ["70000001044979573"],
  },
  {
    id: "astana-turan",
    city: "Астана",
    label: "JetQ Auto",
    lines: ["г. Астана, Туран 34Б"],
    phone: astanaPhone,
    hours: companyHours,
    coords: { lat: 51.122707, lon: 71.406067 },
    twoGisOrgIds: ["70000001115148611"],
  },
];
