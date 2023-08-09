import React from "react";
import { CategoryData } from "../data/FilterTypeData";
import { StyledLi } from "../pages/stMain";

type FilterIconProps = {
  item: CategoryData;
  selected?: boolean;
  onClick: () => void;
};

const FilterIcon: React.FC<FilterIconProps> = ({ item, selected, onClick }) => {
  return (
    <StyledLi selected={selected} onClick={onClick}>
      <img src={item.iconSrc} alt={item.iconAlt} />
      <p>{item.label}</p>
    </StyledLi>
  );
};

export default FilterIcon;
