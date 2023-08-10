import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartBar from "./ChartBar";
import SliderTrack from "./SliderTrack";
import { RootState } from "../redux/store/store";
import { filterPrices } from "../redux/actions/listingsActions";

const FilterModalItem: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  //rangeValueOne, rangeValueTwo 두개의 스테이트는 자식컴포넌트인 SliderTrack으로부터 현재 가격값을 받아와서 저장합니다.
  //저장된 값을 가지고 ChartBar에 props로 넘겨줌으로써 막대그래프와 인풋range는 서로 현재의 값을 실시간 공유합니다.
  //즉 그럼으로써 input range의 위치에 맞춰서 뒤에 막대그래프의 색깔변화를 실시간으로 적용할수있게 해줄수있습니다.
  const [rangeValueOne, setRangeValueOne] = useState<number | null>(null);
  const [rangeValueTwo, setRangeValueTwo] = useState<number | null>(null);
  const listings = useSelector(
    (state: RootState) => state.listingsReducer.allListings
  );
  const pricefilter = listings.map((el) => el.price);
  const dispatch = useDispatch();

  //현재 전체 숙소정보의 가격정보를 가져와서 막대그래프에 쓰일 수치를 만듭니다.
  //최소가격과 최대가격 사이 구간을 25등분해서 나누었습니다.
  const minValue = 0;
  const maxValue = Math.max(...pricefilter);
  const interval = (maxValue - minValue) / 25;

  const pricedata = listings.filter((item) => {
    if (rangeValueOne !== null && rangeValueTwo !== null) {
      return item.price >= rangeValueOne && item.price <= rangeValueTwo;
    }
    return false;
  });

  //현재 구간에 존재하는 숙소의 갯수를 보기위한 변수입니다. 숙소 보기 버튼에 들어갑니다.
  const hotelLength = pricedata.length;

  //sections에 위에서 계산한 25등분의 수치를 반복문을 사용해 2차원 배열로 넣었습니다.
  let sections: number[][] = [];

  console.log(sections);

  for (let i = 0; i < 25; i++) {
    const start = minValue + i * interval;
    const end = start + interval;
    sections.push([Math.round(start), Math.round(end)]);
  }

  //각각의 가격구간이 있는 2차원배열에 모든 숙소정보를 가져와서 어느 구간에 속하는지 구분하는 작업입니다.
  //이 작업으로 각 막대그래프 구간마다 숙소가 어느정도나 있는지 분포도를 알수 있습니다.
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

  //각 분포도를 구한 값을 가지고 25개의 1차원 배열을만듭니다. 값이 없는 구간은 0으로 처리합니다.
  const results = sections.map((section, idx) => {
    return countInIntervals[idx] || 0;
  });

  //이 두개의 함수는 SliderTrack컴포넌트에서 실시간 가격정보를 가져오기 위해 사용되는 함수입니다.
  const handleRangeValueOne = (value: number) => {
    setRangeValueOne(value);
  };
  const handleRangeValueTwo = (value: number) => {
    setRangeValueTwo(value);
  };

  //사용자가 가격대를 설정하고 숙소보기 버튼을 누른다면, redux에 현재 가격대에 존재하는 숙소정보를 넘겨주고, 모달창을 닫습니다.
  const handlePriceFilter = () => {
    dispatch(filterPrices(pricedata));
    closeModal();
  };

  return (
    <div className="pricefilter_wrap">
      <div className="bar_box">
        {results.map((result, i) => {
          //위에서 구한 가격분포도로 map을 돌려서 막대그래프를 만듭니다.
          //즉, 총 25개의 ChartBar가 생성되며 화면에서 보이는 막대그래프트 하나하나가 ChartBar입니다.
          //props로 현재 분포도의 값을 백분율로 계산해 넘겨줍니다. 0인 값은 아예 막대그래프가 안보이기에 기본값으로 3을 주었습니다.
          const percentage = Math.max((result / 50) * 300, 3);
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
      {/* SliderTrack컴포넌트는 막대그래프 아래에 있는 두개의 컨트롤러를 가진 멀티Range입니다. */}
      <SliderTrack
        minValue={minValue}
        maxValue={maxValue}
        ValueOneChange={handleRangeValueOne}
        ValueTwoChange={handleRangeValueTwo}
      />
      <div className="filtermodal_btnbox">
        <button onClick={closeModal}>취소</button>
        <button onClick={handlePriceFilter}>숙소 {hotelLength}개 보기</button>
      </div>
    </div>
  );
};

export default FilterModalItem;
