import React, { useEffect, useState } from "react";
import { StDetail } from "./stDetail";
import { Calendar } from "../components/Calendar";
import { useCalendar } from "../context/Calendar";
import { ReservationForm } from "../components/ReservationForm";
import { parseDateToKo } from "../utils/date";
import { getDetail } from "../api";
import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import KaKaoMap from "../components/KaKaoMap";
import NavLogin from "../components/NavLogin";

const DEFAULT_PRICE = 1;
const Detail = () => {
  const { rangeDate } = useCalendar();
  let { id } = useParams();

  // TODO: id || 1 <- 실제적으로는 에러핸드링해야함
  const { data, isLoading, error } = useFetch(() => getDetail(Number(id || 1)));

  // TODO: 이름 고민
  function RangeDate() {
    const [start, end] = rangeDate;

    if (!start || !end) {
      return (
        <p className="detail_box_item_desc">
          여행 날짜를 입력하여 정확한 요금을 확인하세요.
        </p>
      );
    }

    return `${parseDateToKo(start.$d)} - ${parseDateToKo(end.$d)}`;
  }

  // TODO: 로딩, 에러 UI 구현시
  // if (!data && isLoading) return <div>로딩중...</div>;
  // if (!data || error) return <div>잘못된 요청입니다.</div>;

  const locations = data ? data.location.split(" ") : ["", ""];
  const 위치 = locations.slice(0, 2).join(",");

  // 추후 수정 예정 좀더 좋은코드로!
  const getTagIconSrc = (tagName: any) => {
    return (
      {
        new: ["/icon_new.png", "신규"],
        sea: ["/icon_beach.png", "바닷가"],
        view: ["/icon_best-view.png", "최고의 전망"],
        "": ["/icon_new.png", "신규"],
      } as any
    )[tagName];
  };

  return (
    <StDetail>
      <header className="header">
        <div className="header_box">
          <Link to="/">
            <img src="/logo.svg" alt="logo" />
          </Link>
          <form>
            <label>
              <div>여행지</div>
              <input type="text" placeholder="여행지 입력" />
            </label>
            <button>검색</button>
          </form>
          <NavLogin />
        </div>
      </header>
      <main>
        <section className="section">
          <h1>{data?.title}</h1>
          <p>{위치}</p>
          <div className="section_item_detail">
            <img src={data?.img} alt="img_thumbnail" />
          </div>
        </section>
        <div className="detail_wrapper">
          <div className="detail">
            <article className="detail_box">
              <div className="detail_box_item">
                <p className="detail_box_item_title">
                  {data?.host} 님이 호스팅하는 숙소
                </p>
                <p className="detail_box_item_desc">
                  최대 인원 {data?.maximum}명, 침실 {data?.bedroom}개, 욕실{" "}
                  {data?.bathroom}개
                </p>
              </div>
              <div className="detail_box_item profile">{data?.host}</div>
            </article>
            <article className="detail_box tag">
              {data?.tag.map((item, index) => {
                // TODO: 리팩토링 - 컴포넌트화
                const [iconSrc, title] = getTagIconSrc(item);
                return (
                  <React.Fragment key={index}>
                    <div className="detail_box_item">
                      <img src={iconSrc} alt="icon" />
                    </div>
                    <p className="detail_box_item_title">{title}</p>
                  </React.Fragment>
                );
              })}
            </article>
            <article className="detail_box description">
              <div className="detail_box_item">
                <p className="detail_box_item_desc">{data?.description}</p>
                <p className="detail_box_item_desc">{data?.caution}</p>
              </div>
            </article>
            <article className="detail_box">
              <div className="detail_box_item">
                <p className="detail_box_item_title">
                  체크아웃 날짜를 선택하세요.
                </p>
                <p className="detail_box_item_desc">{RangeDate()}</p>
                <div className="date">
                  <Calendar />
                </div>
              </div>
            </article>
            <article className="detail_box">
              <div className="detail_box_item">
                <p className="detail_box_item_title">후기 (아직) 없음</p>
              </div>
            </article>
            <article className="detail_box column">
              <div className="detail_box_item">
                <p className="detail_box_item_title">호스팅 지역</p>
                <p className="detail_box_item_desc">{위치}</p>
              </div>
              <div className="detail_box_item map">
                {data && !isLoading && <KaKaoMap />}
              </div>
            </article>
          </div>
          <div className="detail_reservation">
            <ReservationForm price={data ? data.price : DEFAULT_PRICE} />
          </div>
        </div>
      </main>
      {/* <footer className="footer">
        <div className="footer_box">푸터</div>
      </footer> */}
    </StDetail>
  );
};

export default Detail;
