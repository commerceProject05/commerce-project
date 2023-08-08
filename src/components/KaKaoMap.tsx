import React, { useEffect } from 'react';
import styled from "styled-components";

// 앱안에서의 인식을 위해 kakao 글로벌 선언
declare global {
  interface Window {
    kakao: any
  }
}

const KaKaoMap = () => {

  // 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어간다.
  // 함수형 컴포넌트에서는 이것을 바로 인식하지 못하기 때문에 인지시켜 window에서 kakao 객체를
  // 뽑아쓰기 위해 작성
  const { kakao } = window;

  useEffect(() => {
    const container = document?.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, [])

  return (
    <div>
      <Map id='map'/>
    </div>
    
  )
}

const Map = styled.div`
  width: 80vw;
  height: 450px;
`;

export default KaKaoMap;
