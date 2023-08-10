import React, { useEffect, useState } from "react";
import {
  RangeContainer,
  RangeInput,
  PriceView,
  PriceView2,
} from "./stFilterModal";

interface RangeValueProps {
  minValue: number;
  maxValue: number;
  ValueOneChange: (value: number) => void;
  ValueTwoChange: (value: number) => void;
}

const SliderTrack: React.FC<RangeValueProps> = ({
  minValue,
  maxValue,
  ValueOneChange,
  ValueTwoChange,
}) => {
  const [isFocusedOne, setIsFocusedOne] = useState(false);
  const [isFocusedTwo, setIsFocusedTwo] = useState(false);
  const [valueOne, setValueOne] = useState(minValue);
  const [valueTwo, setValueTwo] = useState(maxValue);
  //range 슬라이더의 최대수치를 숙소 최고가격으로 설정했습니다.
  const sliderMaxValue = maxValue;
  //range 슬라이더의 최소수치를 숙소 최저가격으로 설정했습니다.
  const soliderMinValue = minValue;
  //최소수치 컨트롤러와 최대수치 컨트롤러의 갭차이를 설정하는 변수입니다.
  //양쪽 두개의 컨트롤러는 이 갭수치만큼 최소한의 거리를 유지합니다.
  const minGap = (maxValue - minValue) / 25;

  useEffect(() => {
    fillColor();
  }, [valueOne, valueTwo]);

  useEffect(() => {
    ValueOneChange(valueOne);
  }, [valueOne]);

  useEffect(() => {
    ValueTwoChange(valueTwo);
  }, [valueTwo]);

  //왼쪽의 컨트롤러는 오른쪽의 컨트롤러에 minGap수치 이하로 접근하지못하게 막는 함수입니다.
  const slideOne = (value: number) => {
    if (valueTwo - value <= minGap) {
      setValueOne(valueTwo - minGap);
    } else {
      setValueOne(value);
    }
  };
  //위와 동일합니다 이건 오른쪽 컨트롤러가 왼쪽 컨트롤러에 minGap수치 이하로 접근하지못하게 막는 함수입니다.
  //이 함수들이 없으면 각 컨트롤러들은 서로를 겹쳐 넘어서 이동하게 됩니다.
  const slideTwo = (value: number) => {
    if (value - valueOne <= minGap) {
      setValueTwo(valueOne + minGap);
    } else {
      setValueTwo(value);
    }
  };
  //fillColor 함수는 두개의 컨트롤러 사이의 색깔을 설정하는 작업입니다.
  //각 컨트롤러의 변화에 따라 수치를 따라가며, 그에 따라서 현재 선택된 내부 범위의 색깔을 좀더 진하게 표시해줍니다.
  const fillColor = () => {
    const sliderTrack = document.querySelector(".slider_track") as HTMLElement;
    const percent1 = (valueOne / sliderMaxValue) * 100;
    const percent2 = (valueTwo / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #7F7F7F ${percent1}%, #7F7F7F ${percent2}%, #dadae5 ${percent2}%)`;
  };
  //이 함수는 사용자가 최저가격창에 값을 입력한후에, 포커싱을 잃었을때 발동하는 함수입니다.
  //사용자가 입력한 값이 최대가격 이상이라면 minGap 차이만큼 최대값보다 아래로 되돌리는 역할을 하고,
  //입력한 값이 최저가격보다 낮은 가격을 입력했다면 최저가격으로 되돌립니다.
  const handleValueOneBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let enteredValue = parseInt(e.target.value);
    if (enteredValue < soliderMinValue) {
      enteredValue = soliderMinValue;
    }
    if (enteredValue >= valueTwo) {
      setValueOne(valueTwo - minGap);
    } else {
      setValueOne(enteredValue);
    }
    setIsFocusedOne(false);
  };
  //위 함수와 비슷한 역할을 합니다. 이 함수는 최대가격을 입력한후에 발동하는 함수이며
  //사용자가 입력한 값이 최저가격 이하라면 minGap 차이만큼 최저값보다 위로 되돌리는 역할을 하고,
  //입력한 값이 최대수치보다 높은 가격을 입력했다면 최대가격으로 되돌립니다.
  const handleValueTwoBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let enteredValue = parseInt(e.target.value);
    if (enteredValue > sliderMaxValue) {
      enteredValue = sliderMaxValue;
    }
    if (enteredValue <= valueOne) {
      setValueTwo(valueOne + minGap);
    } else {
      setValueTwo(enteredValue);
    }
    setIsFocusedTwo(false);
  };

  //아래 두개의 change함수는 부모함수로부터 받아온 setValueOne함수를 통해서 실시간으로 현재값을 부모 스테이트에 보내주는 역할을 합니다.
  const handleValueOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueOne(Number(e.target.value));
  };
  const handleValueTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTwo(Number(e.target.value));
  };

  //아래 두개의 Focus함수는 포커싱을 할때 state를 조작하는 함수입니다.
  //포커싱 되었을때 테두리를 진하게 스타일링 하기위해서 스타일파일에 props를 넘겨주기 위해 사용하는 함수입니다.
  const handleFocusOne = () => {
    setIsFocusedOne(true);
  };
  const handleFocusTwo = () => {
    setIsFocusedTwo(true);
  };

  return (
    <>
      <RangeContainer>
        <div className="slider_track"></div>
        <RangeInput
          min={minValue}
          max={maxValue}
          value={valueOne}
          onChange={(e) => slideOne(parseInt(e.target.value))}
        />
        <RangeInput
          min={minValue}
          max={maxValue}
          value={valueTwo}
          onChange={(e) => slideTwo(parseInt(e.target.value))}
        />
      </RangeContainer>
      <div className="price_box">
        <PriceView $isFocusedOne={isFocusedOne}>
          <div className="price_range">최저</div>
          <div className="price_info">
            <div>&#65510;</div>
            <input
              type="number"
              className="price_value"
              value={Math.floor(valueOne)}
              onBlur={handleValueOneBlur}
              onChange={handleValueOneChange}
              onFocus={handleFocusOne}
            />
          </div>
        </PriceView>
        <div className="price_centerbar"> ㅡ </div>
        <PriceView2 $isFocusedTwo={isFocusedTwo}>
          <div className="price_range">최대</div>
          <div className="price_info">
            <div>&#65510;</div>
            <input
              type="number"
              className="price_value"
              value={Math.floor(valueTwo)}
              onBlur={handleValueTwoBlur}
              onChange={handleValueTwoChange}
              onFocus={handleFocusTwo}
            />
          </div>
        </PriceView2>
      </div>
    </>
  );
};

export default SliderTrack;
