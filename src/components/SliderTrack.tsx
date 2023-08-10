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
  const sliderMaxValue = maxValue;
  const soliderMinValue = minValue;
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

  const slideOne = (value: number) => {
    if (valueTwo - value <= minGap) {
      setValueOne(valueTwo - minGap);
    } else {
      setValueOne(value);
    }
  };

  const slideTwo = (value: number) => {
    if (value - valueOne <= minGap) {
      setValueTwo(valueOne + minGap);
    } else {
      setValueTwo(value);
    }
  };
  const fillColor = () => {
    const sliderTrack = document.querySelector(".slider_track") as HTMLElement;
    const percent1 = (valueOne / sliderMaxValue) * 100;
    const percent2 = (valueTwo / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #7F7F7F ${percent1}%, #7F7F7F ${percent2}%, #dadae5 ${percent2}%)`;
  };
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
  const handleValueOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueOne(Number(e.target.value));
  };
  const handleValueTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTwo(Number(e.target.value));
  };

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
