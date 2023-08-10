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
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const ModalcloseHandler = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  return (
    <ModalBackground onClick={ModalcloseHandler} $isAnimating={isAnimating}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <FilterModalItem />
      </div>
    </ModalBackground>
  );
};

export default FilterModalBackdrop;
