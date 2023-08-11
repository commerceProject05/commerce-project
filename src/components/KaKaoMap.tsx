import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 앱안에서의 인식을 위해 kakao 글로벌 선언
declare global {
  interface Window {
    kakao: any;
  }
}

// Kakao Maps API의 Status 타입 정의
interface Status {
  OK: string;
}

// Kakao Maps API의 GeocoderResult 타입 정의
interface GeocoderResult {
  address: string;
  address_name: string;
  x: string;
  y: string;
  etc: string;
}

type KaKaoMapProps = {
  data: Listing;
  address: string;
};

// TODO: 전체적으로 리팩토링 필수!!, 우선 동작하게만 수행
const KaKaoMap = ({ data, address = "" }: KaKaoMapProps) => {
  const [_map, setMap] = useState<any>();
  const [roadView, setRoadView] = useState<any>(false);
  const [isRoadView, setIsRoadView] = useState<boolean>(false);

  // 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어간다.
  // 함수형 컴포넌트에서는 이것을 바로 인식하지 못하기 때문에 인지시켜 window에서 kakao 객체를
  // 뽑아쓰기 위해 작성
  const { kakao } = window;

  useEffect(() => {
    if (!kakao) {
      console.error("kakao API 가 존재하지 않습니다.");
      return;
    }

    // TODO: 카카오 맵 처리 과정 클래스로 관리하기
    const container = document.getElementById("container"); // 지도와 로드뷰를 감싸고 있는 div 입니다
    const mapWrapper = document?.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const rvContainer = document.getElementById("roadview"); // 로드뷰를 표시할 영역의 DOM 레퍼런스
    const btnMap = document.getElementById("btnMap"); // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다
    const btnRoadview = document.getElementById("btnRoadview"); // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다
    const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    const position = new kakao.maps.LatLng(37.559018, 126.972825);

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.559018, 126.972825),
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(mapWrapper, options); //지도 생성 및 객체 리턴
    const roadview = new kakao.maps.Roadview(rvContainer, options); // 로드뷰 객체 생성 및 객체 리턴
    setMap(map); // map 상태 업데이트
    setRoadView(roadview); // 로드뷰 상태 업데이트

    // 로드뷰의 위치를 특정 장소를 포함하는 파노라마 ID로 설정합니다
    // 로드뷰의 파노라마 ID는 Wizard를 사용하면 쉽게 얻을수 있습니다

    // 특정 장소가 잘보이도록 로드뷰의 적절한 시점(ViewPoint)을 설정합니다
    // Wizard를 사용하면 적절한 로드뷰 시점(ViewPoint)값을 쉽게 확인할 수 있습니다
    roadview.setViewpoint({
      pan: 321,
      tilt: 0,
      zoom: 0,
    });

    const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

    // 주소로 좌표를 검색.
    geocoder?.addressSearch(
      data.location,
      function (result: GeocoderResult[], status: Status) {
        if (status === kakao.maps.services.Status.OK) {
          // 마커 이미지 변경
          const imageSrc = "../img/icon_marker.png"; // 마커이미지의 주소.
          const imageSize = new kakao.maps.Size(70, 69); // 마커이미지의 크기.
          const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정.)

          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );
          const markerPosition = new kakao.maps.LatLng(
            result[0].y,
            result[0].x
          ); // 마커가 표시될 위치.

          // 결과값으로 받은 위치를 마커로 표시.
          const marker = new kakao.maps.Marker({
            map: map,
            position: markerPosition,
            image: markerImage,
          });

          // roadview 위치 등록
          roadviewClient.getNearestPanoId(
            markerPosition,
            50,
            function (panoId: any) {
              roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            }
          );

          // 로드뷰 초기화가 완료되면
          kakao.maps.event.addListener(roadview, "init", function () {
            // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시합니다

            //
            const rvMarker = new kakao.maps.Marker({
              position: markerPosition,
              map: roadview,
            });
          });

          // 인포윈도우로 장소에 대한 설명.
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;font-size:15px; color:red">${address}</div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동.
          map.setCenter(markerPosition);
        }
      }
    );
  }, []);

  // 기존
  const zoomIn = () => {
    _map?.setLevel(_map.getLevel() - 1);
  };

  const zoomOut = () => {
    _map?.setLevel(_map.getLevel() + 1);
  };

  const className = isRoadView ? "view_roadview" : "view_map";
  return (
    <div
      id="container"
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <div
        id="mapWrapper"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Map
          id="map"
          style={{
            display: `${isRoadView ? "none" : "block"}`,
          }}
        />
        <Map
          id="roadview"
          style={{
            display: `${isRoadView ? "block" : "none"}`,
          }}
        />
        {isRoadView ? (
          <ToggleButton
            type="button"
            id="btnMap"
            onClick={() => setIsRoadView(false)}
            title="지도 보기"
            value="지도"
          />
        ) : (
          <ToggleButton
            type="button"
            id="btnRoadview"
            onClick={() => setIsRoadView(true)}
            title="로드뷰 보기"
            value="로드뷰"
          />
        )}

        <ZoomControl className="custom_zoomcontrol radius_border">
          <span onClick={zoomIn}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </span>
          <span onClick={zoomOut}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </span>
        </ZoomControl>
      </div>
    </div>
  );
};

const Map = styled.div`
  width: 100%;
  height: 480px;
  position: relative;
  /* overflow:hidden; */
`;

const ZoomControl = styled.div`
  border-radius: 5px;

  position: absolute; /* 고정 위치 */
  top: 40px; /* 원하는 위치로 조정 */
  right: 40px; /* 원하는 위치로 조정 */
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 1px #9d9d9d;

  span {
    &:first-child {
      border-bottom: 0.5px solid #bfbfbf;
    }
    display: block;
    width: 36px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    img {
      width: 15px;
      height: 20px;
      padding: 12px 0;
      border: none;
    }
  }
`;

const ToggleButton = styled.input`
  position: absolute;
  z-index: 2;
  top: 8px;
  left: 8px;
  width: 55px;

  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  padding: 8px;
`;

export default KaKaoMap;
