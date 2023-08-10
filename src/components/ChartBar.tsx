import React, { useEffect, useState } from "react";
import { StChartBar } from "./stFilterModal";

interface ChartBarProps {
  height: number;
  price: number[];
  priceValue1: number | null;
  priceValue2: number | null;
}

const ChartBar: React.FC<ChartBarProps> = ({
  height,
  price,
  priceValue1,
  priceValue2,
}) => {
  const [ChartOn, setChartOn] = useState(false);

  useEffect(() => {
    if (
      priceValue1 !== null &&
      price[0] >= priceValue1 &&
      priceValue2 !== null &&
      price[1] <= priceValue2
    ) {
      setChartOn(true);
    } else {
      setChartOn(false);
    }
  }, [priceValue1, priceValue2]);

  return <StChartBar height={height} $ChartOn={ChartOn} />;
};

export default ChartBar;
