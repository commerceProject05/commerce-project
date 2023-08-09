import { CategoryData } from "./FilterTypeData";

export const filterCategory: CategoryData[] = [
  {
    id: 0,
    iconSrc: "icon_popularity.png",
    iconAlt: "tag-icon-popularity",
    label: "인기 급상승",
    tag: "like",
  },
  {
    id: 1,
    iconSrc: "icon_new.png",
    iconAlt: "tag-icon-new",
    label: "신규",
    tag: "new",
  },
  {
    id: 2,
    iconSrc: "icon_best-view.png",
    iconAlt: "tag-icon-best-view",
    label: "최고의 전망",
    tag: "view",
  },
  {
    id: 3,
    iconSrc: "icon_beach.png",
    iconAlt: "tag-icon-beach",
    label: "바닷가",
    tag: "sea",
  },
];
