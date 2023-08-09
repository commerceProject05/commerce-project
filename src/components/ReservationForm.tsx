import styled from "@emotion/styled";
import { FormEvent } from "react";
import { DateRangeCalendar } from "./DateRangeCalendar";

export function ReservationForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Price>
          ₩159,000 <span>/박</span>
        </Price>
      </div>
      <DateRangeCalendar />
      <div>게스트 3명</div>
      <ReservationButton>예약하기</ReservationButton>
      <Description>예약 확정 전에는 요금이 청구되지 않습니다.</Description>
      <TotalWrapper>
        <TotalContainer>
          <span>총 합계</span> <span>₩954,000</span>
        </TotalContainer>
      </TotalWrapper>
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
`;

const Description = styled.span`
  color: rgb(34, 34, 34);
  font-size: 14px;
  font-weight: normal;
  margin: 0 auto;
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
