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
  //막대그래프의 색깔 변화를 위한 스테이트입니다.
  const [ChartOn, setChartOn] = useState(false);

  //이 useEffect가 하는일은 사용자가 inputrange를 움직이면 실시간으로 변화는 값을 감지합니다.
  //현재 막대그래프가 화면에서 보이는 최소가격과 최대가격구간안에 있다면 ChartOn을 true로 해주고, 구간을 벗어나면 false로 변경합니다,
  //ChartOn은 CSS를 작성하는 파일에 props 데이터로 넘겨져서 true, false 냐에 따라서 현재 막대그래프의 색깔을 변경시킵니다.
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
