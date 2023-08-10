import React, { useEffect } from "react";
import { ModalBackground } from "./stFilterModal";
import FilterModalItem from "./FilterModalItem";

type FilterModalBackdropProps = {
  isAnimating: boolean;
  setShowModal: (value: boolean) => void;
  setIsAnimating: (value: boolean) => void;
};

const FilterModalBackdrop: React.FC<FilterModalBackdropProps> = ({
  setShowModal,
  isAnimating,
  setIsAnimating,
}) => {
  //useEffect 내용은 모달창이 띄워졌을때 body에 ovflow hidden속성을 줘서 배경 스크롤이 안되게 막는내용입니다.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  //setShowModal이 false가 되면 바로 모달창이 사라지기 때문에 밑으로 사라지는 애미메이션을 주기위해 setTimeout함수를 사용했습니다.
  //setIsAnimating이 false가 되서 밑으로 사라지는 애니메이션이 실행되고, 애니메이션이 끝날떄쯤 모달창이 언마운트 됩니다.
  const ModalcloseHandler = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  return (
    <ModalBackground onClick={ModalcloseHandler} $isAnimating={isAnimating}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <FilterModalItem closeModal={ModalcloseHandler} />
      </div>
    </ModalBackground>
  );
};

export default FilterModalBackdrop;
