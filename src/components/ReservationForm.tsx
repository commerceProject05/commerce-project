import styled from "@emotion/styled";
import { FormEvent, useState } from "react";
import { DateRangeCalendar } from "./DateRangeCalendar";
import { getDiffDay } from "../utils/date";
import { useCalendar } from "../context/Calendar";

const price = 159000;
const MINIMUM_GUEST = 1;
export function ReservationForm() {
  const [guestCount, setGuestCount] = useState(MINIMUM_GUEST);
  const { rangeDate } = useCalendar();
  const [start, end] = rangeDate;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClickGuestCount = (diffNumber: number) => {
    const nextCount = guestCount + diffNumber;
    setGuestCount((guestCount) =>
      nextCount <= MINIMUM_GUEST ? MINIMUM_GUEST : nextCount
    );
  };

  const diffDay = start && end ? getDiffDay(start, end) : 0;
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Price>
          ₩159,000 <span>/박</span>
        </Price>
      </div>
      <DateRangeCalendar />
      <GuestWrapper>
        <span>게스트 {guestCount}명</span>
        <CountWrapper>
          <button
            onClick={() => handleClickGuestCount(-1)}
            disabled={guestCount === MINIMUM_GUEST}
          >
            -
          </button>
          <span className="count">{guestCount}</span>
          <button onClick={() => handleClickGuestCount(1)}>+</button>
        </CountWrapper>
      </GuestWrapper>
      <ReservationButton disabled={!(start && end)}>예약하기</ReservationButton>
      {diffDay !== 0 && (
        <>
          <Description>예약 확정 전에는 요금이 청구되지 않습니다.</Description>
          <OptionWrapper>
            <span>
              ₩{price.toLocaleString("ko-KR")} x {diffDay}박
            </span>
            <span>₩{(diffDay * price).toLocaleString("ko-KR")}</span>
          </OptionWrapper>
          <TotalWrapper>
            <TotalContainer>
              <span>총 합계</span>{" "}
              <span>₩{(diffDay * price).toLocaleString("ko-KR")}</span>
            </TotalContainer>
          </TotalWrapper>
        </>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: bold;

  span {
    font-size: 1.5rem;
    font-weight: normal;
  }
`;

const ReservationButton = styled.button`
  width: 100%;
  color: white;
  height: 48px;
  border: 1px solid #e31c5f;
  border-radius: 1rem;
  background-color: #e31c5f;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: initial;
  }
`;

const GuestWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
  }
`;

const CountWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  .count {
    font-size: 20px;
  }

  button {
    border-radius: 50%;
    border: 1px solid #8c8c8c;
    height: 32px;
    width: 32px;
    background-color: white;
    cursor: pointer;
    font-size: 20px;
  }
  button:disabled {
    cursor: initial;
    border-color: lightgray;
    color: lightgray;
  }
`;

const Description = styled.span`
  color: rgb(34, 34, 34);
  font-size: 14px;
  font-weight: normal;
  margin: 0 auto;
`;

const OptionWrapper = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: space-between;

  span {
    font-size: 16px;
    color: #595959;
  }
  span:nth-child(1) {
    text-decoration: underline;
  }
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  justify-content: space-between;

  &:before {
    content: "";
    border: 1px solid lightgray;
    margin-bottom: 2rem;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 16px;
  }
`;
