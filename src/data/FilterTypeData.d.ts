declare type CategoryData = {
  id: number;
  iconSrc: string;
  iconAlt: string;
  label: string;
  tag: string;
};

declare type Listing = {
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

declare type RootState = {
  allListings: Listing[];
  filteredListings: Listing[];
};
