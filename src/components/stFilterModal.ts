import { styled } from "styled-components";

interface ModalBackgroundProps {
  $isAnimating: boolean;
}
interface BarProps {
  height: number;
  $ChartOn: boolean;
}

interface PriceOutline1 {
  $isFocusedOne: boolean;
}
interface PriceOutline2 {
  $isFocusedTwo: boolean;
}

export const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ $isAnimating }) =>
    $isAnimating ? "fadeIn 0.7s forwards" : "fadeOut 0.7s forwards"};
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .modal_container {
    width: 780px;
    height: 700px;
    background-color: #fff;
    border-radius: 15px;
    transform: translateY(100vh);

    animation: ${({ $isAnimating }) =>
      $isAnimating ? "slideUp 0.7s forwards" : "slideDown 0.7s forwards"};
    @keyframes slideUp {
      from {
        transform: translateY(100vh);
      }
      to {
        transform: translateY(0);
      }
    }
    @keyframes slideDown {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(100vh);
      }
    }
    .pricefilter_wrap {
      margin-top: 10px;
      width: 100%;
      height: 250px;
      background-color: #fff;
      position: relative;
      .bar_box {
        width: 90%;
        margin: auto;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
      }
      .price_box {
        width: 90%;
        margin: auto;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price_range {
          font-size: 14px;
          margin-bottom: 5px;
        }
        .price_info {
          display: flex;
          div {
            font-size: 16px;
          }
          .price_value {
            border: none;
            outline: none;
            font-size: 16px;
          }
          input::-webkit-inner-spin-button,
          input::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
      .price_centerbar {
        font-size: 30px;
        font-weight: 100;
      }
      .filtermodal_btnbox {
        margin: auto;
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin-top: 200px;
        align-items: center;
      }
    }
  }
`;

export const StChartBar = styled.div<BarProps>`
  width: 30px;
  height: ${({ height }) => `${height}%`};
  background-color: #000;
  opacity: ${({ $ChartOn }) => ($ChartOn ? 1 : 0.5)};
  margin: 5px;
`;

export const RangeContainer = styled.div`
  position: relative;
  width: 90%;
  margin: -40px auto 0;
  height: 100px;
  .slider_track {
    width: 100%;
    height: 5px;
    background-color: #d5d5d5;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    border-radius: 5px;
  }
`;

export const RangeInput = styled.input.attrs((props) => ({
  type: "range",
}))`
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #7f7f7f;
    height: 2em;
    width: 2em;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    margin-top: -10px;
    pointer-events: auto;
  }
  &:active::-webkit-slider-thumb {
    transform: scale(1.15);
  }
`;

export const PriceView = styled.label<PriceOutline1>`
  display: flex;
  flex-direction: column;
  border: ${({ $isFocusedOne }) =>
    $isFocusedOne ? "2px solid black" : "1px solid #7f7f7f"};
  border-radius: 10px;
  padding: 10px 15px;
`;

export const PriceView2 = styled.label<PriceOutline2>`
  display: flex;
  flex-direction: column;
  border: ${({ $isFocusedTwo }) =>
    $isFocusedTwo ? "2px solid black" : "1px solid #7f7f7f"};
  border-radius: 10px;
  padding: 10px 15px;
`;
