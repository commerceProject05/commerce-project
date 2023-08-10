import React, { useEffect, useState } from "react";
import { StDetail } from "./stDetail";
import { Calendar } from "../components/Calendar";
import { useCalendar } from "../context/Calendar";
import { ReservationForm } from "../components/ReservationForm";
import { parseDateToKo } from "../utils/date";
import { getDetail } from "../api";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import KaKaoMap from "../components/KaKaoMap";

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
  // if (!data ||) return <div>잘못된 요청입니다.</div>;

  return (
    <StDetail>
      <header className="header">
        <div className="header_box">
          <img src="./logo.svg" alt="logo" />
          <form>
            <label>
              <div>여행지</div>
              <input type="text" placeholder="여행지 입력" />
            </label>
            <button>검색</button>
          </form>
          <div className="header_box_login">로그인</div>
        </div>
      </header>
      <main>
        <section className="section">
          <h1>더플래츠글램핑</h1>
          <p>가평군, 경기도, 한국</p>
          <div className="section_item_detail">
            <img src="img_detail.webp" alt="img_thumbnail" />
          </div>
        </section>

        <div className="detail_wrapper">
          <div className="detail">
            <article className="detail_box">
              <div className="detail_box_item">
                <p className="detail_box_item_title">
                  필숙 님이 호스팅하는 텐트
                </p>
                <p className="detail_box_item_desc">
                  최대 인원 2명﹒침실﹒1개침대﹒1개공용 간이
                </p>
              </div>
              <div className="detail_box_item profile">필</div>
            </article>
            <article className="detail_box tag">
              <div className="detail_box_item">
                <img src="icon_best-view.png" alt="icon" />
              </div>
              <p className="detail_box_item_title">최고의 전망</p>
              <div className="detail_box_item">
                <img src="icon_new.png" alt="icon" />
              </div>
              <p className="detail_box_item_title">신규</p>
            </article>
            <article className="detail_box description">
              <div className="detail_box_item">
                <p className="detail_box_item_desc">
                  안녕하세요! 가평 상면에 위치해 있는 글램핑장 '더 플래츠
                  글램핑' 입니다^^
                </p>
                <p className="detail_box_item_desc">
                  항상 최고의 서비스와 힐링공간으로 보답해 드리겠습니다~!!
                </p>
                <p className="detail_box_item_desc">
                  철저한 위생 청결, 소독과 방역 준수 O
                </p>
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
                <p className="detail_box_item_desc">가평군, 경기도, 한국</p>
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
      <footer className="footer">
        <div className="footer_box">푸터</div>
      </footer>
    </StDetail>
  );
};

export default Detail;
