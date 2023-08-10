import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChartBar from "./ChartBar";
import SliderTrack from "./SliderTrack";
import { RootState } from "../redux/store/store";

const FilterModalItem = () => {
  const [rangeValueOne, setRangeValueOne] = useState<number | null>(null);
  const [rangeValueTwo, setRangeValueTwo] = useState<number | null>(null);
  const listings = useSelector(
    (state: RootState) => state.listingsReducer.allListings
  );
  const pricefilter = listings.map((el) => el.price);
  const minValue = Math.min(...pricefilter);
  const maxValue = Math.max(...pricefilter);
  const interval = (maxValue - minValue) / 25;

  const pricedata = listings.filter((item) => {
    if (rangeValueOne !== null && rangeValueTwo !== null) {
      return item.price >= rangeValueOne && item.price <= rangeValueTwo;
    }
    return false;
  });

  const hotelLength = pricedata.length;

  let sections: number[][] = [];

  for (let i = 0; i < 25; i++) {
    const start = minValue + i * interval;
    const end = start + interval;
    sections.push([Math.round(start), Math.round(end)]);
  }

  const countInIntervals = pricefilter
    .map((price) => {
      return sections.findIndex(([min, max]) => price >= min && price <= max);
    })
    .reduce<Record<number, number>>((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const results = sections.map((section, idx) => {
    return countInIntervals[idx] || 0;
  });

  const handleRangeValueOne = (value: number) => {
    setRangeValueOne(value);
  };
  const handleRangeValueTwo = (value: number) => {
    setRangeValueTwo(value);
  };

  return (
    <div className="pricefilter_wrap">
      <div className="bar_box">
        {results.map((result, i) => {
          const percentage = Math.max((result / 50) * 100, 3);
          return (
            <ChartBar
              key={i}
              height={percentage}
              price={sections[i]}
              priceValue1={rangeValueOne}
              priceValue2={rangeValueTwo}
            />
          );
        })}
      </div>
      <SliderTrack
        minValue={minValue}
        maxValue={maxValue}
        ValueOneChange={handleRangeValueOne}
        ValueTwoChange={handleRangeValueTwo}
      />
      <div className="filtermodal_btnbox">
        <button>취소</button>
        <button>숙소 {hotelLength}개 보기</button>
      </div>
    </div>
  );
};

export default FilterModalItem;
