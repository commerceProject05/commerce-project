export type CategoryData = {
  id: number;
  iconSrc: string;
  iconAlt: string;
  label: string;
  tag: string;
};

export type Listing = {
  id: number;
  title: string;
  host: string;
  description: string;
  caution: string;
  price: number;
  location: string;
  like: number;
  maximum: number;
  bedroom: number;
  bathroom: number;
  tag: string[];
};
