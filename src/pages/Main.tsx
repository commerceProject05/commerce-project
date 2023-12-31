import React, { useState, useEffect } from "react";
import { StMain } from "./stMain";
import data from "../data.json";
import ListingItem from "../components/ListingItem";
import { filterCategory } from "../data/filterCategoryData";
import FilterIcon from "../components/FilterIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setListings,
  filterListings,
  sortByLikes,
} from "../redux/actions/listingsActions";
import FilterModalBackdrop from "../components/FilterModalBackdrop";
import Search from "../components/Search";
import { RootState } from "../redux/store/store";
import NavLogin from "../components/NavLogin";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";

// 무한스크롤
interface Item {
  id: number;
  name: string;
  // 추가적인 필드들이 있다면 여기에 정의합니다.
}

const PAGE_SIZE = 16;

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [originData, setOriginData] = useState<Listing[]>([]); // api 에서 요청 받은 값
  const [datas, setDatas] = useState<Listing[]>([]); // 실제로 보여줄 데이터들 (0, 16, 32, 48)
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const listings = useSelector(
    (state: RootState) => state.listingsReducer.filteredListings
  );
  // 리듀서가 컴바인되면서 Rootstate가 바뀌고 기존 코드가 에러를 내뿜었습니다
  // 해당 state안에서 사용하는 리듀서를 호출해줘야해요!

  console.log("origin datas", datas);

  // 인프니트 스크롤
  // 동작방식
  // 1. 처음에는 0 ~ 16,
  // 2. 더 보기 요청하면 0 ~ 32
  // 3. 더 보기 요청하면 0 ~ 48
  // 4. 더 보기 요청하면 0 ~ 50

  // 더보기 요청할때마다
  // originData 가 0 ~ 50, 1번째 인경우 0 ~ 16
  // 2 번째인 경우 0 ~ 32

  // reducer를 combine하는 과정에서 Rootstate type을 수정했습니다!
  // 해당 Rootstate 타입은 다른 곳에서도 사용 될 것 같아서 store.ts에서 선언해놨습니다.
  // type RootState = {
  //   allListings: Listing[];
  //   filteredListings: Listing[];
  // };

  useEffect(() => {
    dispatch(setListings(data));
  }, [dispatch]);

  useEffect(() => {
    searchCheck(searchInput);
  }, [searchInput]);

  //현재 클릭한 필터아이콘이 인기순이면, 인기순정렬 액션을보내고,
  //그외 다른 카테고리라면 그에 맞는 tag값을 필터정렬액션에 담아서 보냅니다.
  const handleFilterClick = (tag: string) => {
    if (tag === "like") {
      dispatch(sortByLikes());
    } else {
      dispatch(filterListings(tag));
    }
  };

  // search 검색어를 검색버튼 누르면 자식 컴포넌트에서 받아오기
  const search = (input: string) => {
    setSearchInput(input);
  };

  // 검색어 키워드가 있는데 필터링한 list가 없을때 alert창 띄운후 모든 리스트 나타냄(임시)
  const searchCheck = (input: string) => {
    let length = input.length;
    if (length > 0 && listings.length < 1) {
      console.log("안되나");
      alert("해당 검색어의 에어비엔비 상품을 찾을 수 없습니다.");
      dispatch(setListings(data));
      setSearchInput("");
    }
  };

  //모달을 오픈하기위한 함수입니다.
  const showModalHandler = () => {
    setShowModal(true);
    setIsAnimating(true);
  };

  const roomItems = listings.slice(0, PAGE_SIZE * page);
  return (
    <>
      <StMain>
        <header className="header">
          <div className="header_box">
            <img src="./logo.svg" alt="logo" />
            <Search search={search} />
            <NavLogin />
          </div>
        </header>
        <main>
          <div className="category">
            <ul>
              {filterCategory.map((item) => (
                <FilterIcon
                  key={item.id}
                  item={item}
                  selected={selectedCategory === item.id}
                  onClick={() => {
                    setSelectedCategory(item.id);
                    handleFilterClick(item.tag);
                  }}
                />
              ))}
              <FilterBtn onClick={showModalHandler}>...</FilterBtn>
            </ul>
          </div>

          <article>
            <InfiniteScroll
              dataLength={roomItems.length}
              next={() => setPage((prev) => prev + 1)}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <ul className="goods">
                {roomItems.map((item) => (
                  <ListingItem key={item.id} item={item} />
                ))}
              </ul>
            </InfiniteScroll>
            {/* ))} */}
          </article>
        </main>
        {/* <footer className="footer">
          <div className="footer_box">푸터</div>
        </footer> */}
      </StMain>
      {showModal && (
        <FilterModalBackdrop
          setShowModal={setShowModal}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      )}
    </>
  );
};

export default Main;

const FilterBtn = styled.button`
  width: 70px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  font-weight: 600;
`;
