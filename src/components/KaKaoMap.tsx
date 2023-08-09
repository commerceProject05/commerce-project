import React, { useEffect, useState } from 'react';
import styled from "styled-components";

// 앱안에서의 인식을 위해 kakao 글로벌 선언
declare global {
  interface Window {
    kakao: any
  }
}

// Kakao Maps API의 Status 타입 정의
interface Status {
  OK : string,
}

// Kakao Maps API의 GeocoderResult 타입 정의
interface GeocoderResult {
  address: string;
  address_name: string;
  x: string;
  y: string;
  etc: string;
}

const KaKaoMap = () => {

  const [_map, setMap] = useState<any>();

  console.log(_map);

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
    setMap(map); // map 상태 업데이트

    const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

    // 주소로 좌표를 검색.
    geocoder?.addressSearch('서울 종로구 종로5가', function (
      result: GeocoderResult[],
      status: Status
    ) {
      if (status === kakao.maps.services.Status.OK) {

        // 마커 이미지 변경
        const imageSrc = '../img/icon_marker.png'; // 마커이미지의 주소.   
        const imageSize = new kakao.maps.Size(70, 69); // 마커이미지의 크기.
        const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정.)

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        const markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x); // 마커가 표시될 위치.

        // 결과값으로 받은 위치를 마커로 표시.
        const marker = new kakao.maps.Marker({
          map: map,
          position: markerPosition,
          image: markerImage
        });

        // 인포윈도우로 장소에 대한 설명.
        const infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;font-size:15px; color:red">동대문 시장</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동.
        map.setCenter(markerPosition);
      } 
    })
  }, []);

  const zoomIn = () => {
    _map?.setLevel(_map.getLevel() - 1);
  }

  const zoomOut = () => {
    _map?.setLevel(_map.getLevel() + 1);
  }

  return (
    <div>
      <Map id='map'/>
      <ZoomControl className="custom_zoomcontrol radius_border">
        <span onClick={zoomIn}>
          <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
        </span>
        <span onClick={zoomOut}>
          <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
        </span>
      </ZoomControl>
    </div> 
  )
}

const Map = styled.div`
  width:80vw;
  height:400px;
  position:relative;
  /* overflow:hidden; */
`;

const ZoomControl = styled.div`
  border-radius:5px;

  position:absolute;
  top:50px;
  right:350px;
  width:36px;
  height:80px;
  overflow:hidden;
  z-index:1;
  background-color:#ffffff;
  box-shadow: 0px 0px 10px 1px #9d9d9d;

  span{
    &:first-child{
      border-bottom:0.5px solid #bfbfbf;
    }
    display:block;
    width:36px;
    height:40px;
    text-align:center;
    cursor:pointer;
    img{
      width:15px;
      height:15px;
      padding:12px 0;
      border:none;
    }
  }
`

export default KaKaoMap;
