export interface Property {
  id: string;
  project: string;
  projectLoc: string;
  mode: 'buy' | 'rent';
  title: string;
  location: string;
  type: string;
  beds: number;
  baths: number;
  area: number;
  price: number;
  priceLabel: string;
  priceSub: string;
  img: string;
  status?: string;
}