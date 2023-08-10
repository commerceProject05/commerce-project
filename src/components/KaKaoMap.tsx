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
  // const [_roadView, setRoadView] = useState<any>();
  const [roadView, setRoadView] = useState<boolean>(true);
  
  // const [className, setClassName] = useState<string>('view_map');

  // 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어간다.
  // 함수형 컴포넌트에서는 이것을 바로 인식하지 못하기 때문에 인지시켜 window에서 kakao 객체를
  // 뽑아쓰기 위해 작성
  const { kakao } = window;

  useEffect(() => {
    const container = document.getElementById('container') // 지도와 로드뷰를 감싸고 있는 div 입니다
    const mapWrapper = document?.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const rvContainer = document.getElementById('roadview') // 로드뷰를 표시할 영역의 DOM 레퍼런스
    const btnMap = document.getElementById('btnMap') // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다
    const btnRoadview = document.getElementById('btnRoadview') // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다

    const placePosition = new kakao.maps.LatLng(33.450701, 126.570667);

    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: placePosition, //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };


    const map = new kakao.maps.Map(mapWrapper, options); //지도 생성 및 객체 리턴
    const roadview = new kakao.maps.Roadview(rvContainer);// 로드뷰 객체 생성 및 객체 리턴
    setMap(map); // map 상태 업데이트
    setRoadView(roadview); // 로드뷰 상태 업데이트

  //   // 로드뷰의 위치를 특정 장소를 포함하는 파노라마 ID로 설정합니다
  //   // 로드뷰의 파노라마 ID는 Wizard를 사용하면 쉽게 얻을수 있습니다 
    roadview.setPanoId(1023434522, placePosition);

  //   // 특정 장소가 잘보이도록 로드뷰의 적절한 시점(ViewPoint)을 설정합니다 
  //   // Wizard를 사용하면 적절한 로드뷰 시점(ViewPoint)값을 쉽게 확인할 수 있습니다
    roadview.setViewpoint({
      pan: 321,
      tilt: 0,
      zoom: 0
    });

    const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

  //   // 주소로 좌표를 검색.
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

        // 로드뷰 초기화가 완료되면 
        kakao.maps.event.addListener(roadview, 'init', function () {
          // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시합니다 

          console.log("roadview", roadview)

          // 
          const rvMarker = new kakao.maps.Marker({
            position: markerPosition,
            // map: roadview
          });
        });

        // // 인포윈도우로 장소에 대한 설명.
        const infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;font-size:15px; color:red">동대문 시장</div>'
        });
        infowindow.open(map, marker);

        // // 지도의 중심을 결과값으로 받은 위치로 이동.
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

    const className = roadView ?'view_roadview' : 'view_map';

    

    // return (
    // <div id='container' className={`${className}`} style={{position:"relative"}}>
    //   {roadView === true ? (
    //     <div id="mapWrapper" style={{ width: "100%", height: "300px", position: "relative" }}>
    //       <Map id='map' />
    //       <div id="rvWrapper" style={{ width: "100%", height: "300px", position: "absolute", top: "0", left: "0" }}>
    //          <div id="roadview" style={{ height: "100%" }}></div> 로드뷰를 표시할 div 입니다
    //          <input type="button" id="btnMap" onClick={() => setRoadView(false)} title="지도 보기" value="지도" />
    //        </div>
    //       <ZoomControl className="custom_zoomcontrol radius_border">
    //         <span onClick={zoomIn}>
    //           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
    //         </span>
    //         <span onClick={zoomOut}>
    //           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
    //         </span>
    //       </ZoomControl>
    //        <input type="button" id="btnMap" onClick={() => setRoadView(false)} title="지도 보기" value="지도" />
    //     </div>
    //   ):(
    //      <div style={{position:"relative"}}>
    //       <Map id='map'/>
    //       <ZoomControl className="custom_zoomcontrol radius_border">
    //         <span onClick={zoomIn}>
    //       <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
    //     </span>
    //     <span onClick={zoomOut}>
    //       <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
    //     </span>
    //   </ZoomControl>
    //   <input type="button" id="btnRoadview" onClick={() => setRoadView(true)} title="로드뷰 보기" value="로드뷰" />
    // </div>
    //   )}
    //  </div> 
  //  )
}

// 백업
// const __KaKaoMap = () => {
//   const [_map, setMap] = useState<any>();
//   // const [_roadView, setRoadView] = useState<any>();
//   const [roadView, setRoadView] = useState<boolean>(true);
  
//   // const [className, setClassName] = useState<string>('view_map');

//   // 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어간다.
//   // 함수형 컴포넌트에서는 이것을 바로 인식하지 못하기 때문에 인지시켜 window에서 kakao 객체를
//   // 뽑아쓰기 위해 작성
//   const { kakao } = window;

//   useEffect(() => {
//     const container = document.getElementById('container') // 지도와 로드뷰를 감싸고 있는 div 입니다
//     const mapWrapper = document?.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//     const rvContainer = document.getElementById('roadview') // 로드뷰를 표시할 영역의 DOM 레퍼런스
//     const btnMap = document.getElementById('btnMap') // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다
//     const btnRoadview = document.getElementById('btnRoadview') // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다

//     const placePosition = new kakao.maps.LatLng(33.450701, 126.570667);

//     const options = { //지도를 생성할 때 필요한 기본 옵션
//       center: placePosition, //지도의 중심좌표.
//       level: 3 //지도의 레벨(확대, 축소 정도)
//     };


//     const map = new kakao.maps.Map(mapWrapper, options); //지도 생성 및 객체 리턴
//     const roadview = new kakao.maps.Roadview(rvContainer);// 로드뷰 객체 생성 및 객체 리턴
//     setMap(map); // map 상태 업데이트
//     setRoadView(roadview); // 로드뷰 상태 업데이트

//   //   // 로드뷰의 위치를 특정 장소를 포함하는 파노라마 ID로 설정합니다
//   //   // 로드뷰의 파노라마 ID는 Wizard를 사용하면 쉽게 얻을수 있습니다 
//     roadview.setPanoId(1023434522, placePosition);

//   //   // 특정 장소가 잘보이도록 로드뷰의 적절한 시점(ViewPoint)을 설정합니다 
//   //   // Wizard를 사용하면 적절한 로드뷰 시점(ViewPoint)값을 쉽게 확인할 수 있습니다
//     roadview.setViewpoint({
//       pan: 321,
//       tilt: 0,
//       zoom: 0
//     });

//     const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

//   //   // 주소로 좌표를 검색.
//     geocoder?.addressSearch('서울 종로구 종로5가', function (
//       result: GeocoderResult[],
//       status: Status
//     ) {
//       if (status === kakao.maps.services.Status.OK) {

//         // 마커 이미지 변경
//         const imageSrc = '../img/icon_marker.png'; // 마커이미지의 주소.   
//         const imageSize = new kakao.maps.Size(70, 69); // 마커이미지의 크기.
//         const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정.)

//         const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
//         const markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x); // 마커가 표시될 위치.

//         // 결과값으로 받은 위치를 마커로 표시.
//         const marker = new kakao.maps.Marker({
//           map: map,
//           position: markerPosition,
//           image: markerImage
//         });

//         // 로드뷰 초기화가 완료되면 
//         kakao.maps.event.addListener(roadview, 'init', function () {
//           // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시합니다 

//           console.log("roadview", roadview)

//           // 
//           const rvMarker = new kakao.maps.Marker({
//             position: markerPosition,
//             // map: roadview
//           });
//         });

//         // // 인포윈도우로 장소에 대한 설명.
//         const infowindow = new kakao.maps.InfoWindow({
//           content: '<div style="width:150px;text-align:center;padding:6px 0;font-size:15px; color:red">동대문 시장</div>'
//         });
//         infowindow.open(map, marker);

//         // // 지도의 중심을 결과값으로 받은 위치로 이동.
//         map.setCenter(markerPosition);
//       } 
//     })
//   }, []);

//   const zoomIn = () => {
//     _map?.setLevel(_map.getLevel() - 1);
//   }

//   const zoomOut = () => {
//     _map?.setLevel(_map.getLevel() + 1);
//   }

//   // // 지도와 로드뷰를 감싸고 있는 div의 class를 변경하여 지도를 숨기거나 보이게 하는 함수입니다 
//   // const toggleMap = (active:boolean) => {
//   //   if (active) {
//   //     // 지도가 보이도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
//   //     // setClassName("view_map")
//   //   } else {
//   //     // 지도가 숨겨지도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
//   //     // setClassName("view_roadview") 
//   //   }
//   // }

//     const className = roadView ?'view_roadview' : 'view_map'
//     return (
//     <div id='container' className={`${className}`} style={{position:"relative"}}>
//       {/* <div id="roadview" style={{ height: "100%" }}></div> 로드뷰를 표시할 div 입니다 */}
//       {roadView === true ? (
//         <div id="mapWrapper" style={{ width: "100%", height: "300px", position: "relative" }}>
//           <Map id='map' />
//           <div id="rvWrapper" style={{ width: "100%", height: "300px", position: "absolute", top: "0", left: "0" }}>
//              <div id="roadview" style={{ height: "100%" }}></div> 로드뷰를 표시할 div 입니다
//              <input type="button" id="btnMap" onClick={() => setRoadView(false)} title="지도 보기" value="지도" />
//            </div>
//           {/* <ZoomControl className="custom_zoomcontrol radius_border">
//             <span onClick={zoomIn}>
//               <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
//             </span>
//             <span onClick={zoomOut}>
//               <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
//             </span>
//           </ZoomControl> */}
//            <input type="button" id="btnMap" onClick={() => setRoadView(false)} title="지도 보기" value="지도" />
//         </div>
//       ):(
//          <div style={{position:"relative"}}>
//           <Map id='map'/>
//           <ZoomControl className="custom_zoomcontrol radius_border">
//             <span onClick={zoomIn}>
//           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
//         </span>
//         <span onClick={zoomOut}>
//           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
//         </span>
//       </ZoomControl>
//       <input type="button" id="btnRoadview" onClick={() => setRoadView(true)} title="로드뷰 보기" value="로드뷰" />
//     </div>
//           // <div id="rvWrapper" style={{ width: "100%", height: "300px", position: "absolute", top: "0", left: "0" }}>
//           //   <div id="roadview" style={{ height: "100%" }}></div> 로드뷰를 표시할 div 입니다
//           //   <input type="button" id="btnMap" onClick={() => setToggleMap(false)} title="지도 보기" value="지도" />
//           // </div>
//       )}
//      </div> 
//    )
//   // // return (
//   // //   <div id='container' className={`${className}`} style={{position:"relative"}}>
//   // //     {/* {_isRoadView===false? ( */}
//   // //       <div id="mapWrapper" style={{ width: "100%", height: "300px", position: "relative" }}>
//   // //         <Map id='map' />
//   // //         <ZoomControl className="custom_zoomcontrol radius_border">
//   // //           <span onClick={zoomIn}>
//   // //             <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
//   // //           </span>
//   // //           <span onClick={zoomOut}>
//   // //             <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
//   // //           </span>
//   // //         </ZoomControl>
//   // //         <input type="button" id="btnRoadview" onClick={() => toggleMap(false)} title="로드뷰 보기" value="로드뷰" />
//   // //       </div>
//   //     {/* ):( */}
//   //         {/* <div id="rvWrapper" style={{ width: "100%", height: "300px", position: "absolute", top: "0", left: "0" }}> */}
//   //           {/* <div id="roadview" style={{ height: "100%" }}></div> 로드뷰를 표시할 div 입니다 */}
//   //           {/* <input type="button" id="btnMap" onClick={() => toggleMap(true)} title="지도 보기" value="지도" /> */}
//   //         {/* </div> */}
//   //     {/* )} */}
//   //   // </div> 
//   // // )
// }

// const _KaKaoMap = () => {

//   const [_map, setMap] = useState<any>();
//   const [roadView, setRoadView] = useState(false)

//   // 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어간다.
//   // 함수형 컴포넌트에서는 이것을 바로 인식하지 못하기 때문에 인지시켜 window에서 kakao 객체를
//   // 뽑아쓰기 위해 작성
//   const { kakao } = window;

//   useEffect(() => {

//     const container = document?.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//     const options = { //지도를 생성할 때 필요한 기본 옵션
//       center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//       level: 3 //지도의 레벨(확대, 축소 정도)
//     };

//     const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//     setMap(map); // map 상태 업데이트

//     const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체

//     // 주소로 좌표를 검색.
//     geocoder?.addressSearch('서울 종로구 종로5가', function (
//       result: GeocoderResult[],
//       status: Status
//     ) {
//       if (status === kakao.maps.services.Status.OK) {

//         // 마커 이미지 변경
//         const imageSrc = '../img/icon_marker.png'; // 마커이미지의 주소.   
//         const imageSize = new kakao.maps.Size(70, 69); // 마커이미지의 크기.
//         const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정.)

//         const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
//         const markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x); // 마커가 표시될 위치.

//         // 결과값으로 받은 위치를 마커로 표시.
//         const marker = new kakao.maps.Marker({
//           map: map,
//           position: markerPosition,
//           image: markerImage
//         });

//         // 인포윈도우로 장소에 대한 설명.
//         const infowindow = new kakao.maps.InfoWindow({
//           content: '<div style="width:150px;text-align:center;padding:6px 0;font-size:15px; color:red">동대문 시장</div>'
//         });
//         infowindow.open(map, marker);

//         // 지도의 중심을 결과값으로 받은 위치로 이동.
//         map.setCenter(markerPosition);
//       } 
//     })
//   }, []);

//   const zoomIn = () => {
//     _map?.setLevel(_map.getLevel() - 1);
//   }

//   const zoomOut = () => {
//     _map?.setLevel(_map.getLevel() + 1);
//   }


//   const className = roadView ?'view_roadview' : 'view_map'
//     return (
//     <div id='container' className={`${className}`} style={{position:"relative"}}>
//       {roadView === true ? (
//         <div id="mapWrapper" style={{ width: "100%", height: "300px", position: "relative" }}>
//           <Map id='map' />
//           <ZoomControl className="custom_zoomcontrol radius_border">
//             <span onClick={zoomIn}>
//               <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
//             </span>
//             <span onClick={zoomOut}>
//               <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
//             </span>
//           </ZoomControl>
//            <input type="button" id="btnMap" onClick={() => setRoadView(false)} title="지도 보기" value="지도" />
//         </div>
//       ):(
//          <div style={{position:"relative"}}>
//           <Map id='map'/>
//           <ZoomControl className="custom_zoomcontrol radius_border">
//             <span onClick={zoomIn}>
//           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
//         </span>
//         <span onClick={zoomOut}>
//           <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
//         </span>
//       </ZoomControl>
//       <input type="button" id="btnRoadview" onClick={() => setRoadView(true)} title="로드뷰 보기" value="로드뷰" />
//     </div>
//           // <div id="rvWrapper" style={{ width: "100%", height: "300px", position: "absolute", top: "0", left: "0" }}>
//           //   <div id="roadview" style={{ height: "100%" }}></div> 로드뷰를 표시할 div 입니다
//           //   <input type="button" id="btnMap" onClick={() => setToggleMap(false)} title="지도 보기" value="지도" />
//           // </div>
//       )}
//      </div> 
//    )
// }


const Map = styled.div`
  width:100%;
  height:480px;
  position:relative;
  /* overflow:hidden; */
`;

const ZoomControl = styled.div`
  border-radius:5px;

  position: absolute; /* 고정 위치 */
  top: 40px; /* 원하는 위치로 조정 */
  right: 40px; /* 원하는 위치로 조정 */
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
      height:20px;
      padding:12px 0;
      border:none;
    }
  }
`

export default KaKaoMap;
