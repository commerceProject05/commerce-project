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

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // reducer를 combine하는 과정에서 Rootstate type을 수정했습니다!
  // 해당 Rootstate 타입은 다른 곳에서도 사용 될 것 같아서 store.ts에서 선언해놨습니다.
  // type RootState = {
  //   allListings: Listing[];
  //   filteredListings: Listing[];
  // };

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const listings = useSelector(
    (state: RootState) => state.listingsReducer.filteredListings
  );
  // 리듀서가 컴바인되면서 Rootstate가 바뀌고 기존 코드가 에러를 내뿜었습니다
  // 해당 state안에서 사용하는 리듀서를 호출해줘야해요!

  useEffect(() => {
    dispatch(setListings(data));
  }, [dispatch]);

  useEffect(() => {
    searchCheck(searchInput);
  }, [searchInput]);

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
    console.log("length", input.length);
    if (length > 0 && listings.length < 1) {
      console.log("안되나");
      alert("해당 검색어의 에어비엔비 상품을 찾을 수 없습니다.");
      dispatch(setListings(data));
      setSearchInput("");
    }
  };

  console.log("listings", listings);

  const showModalHandler = () => {
    setShowModal(true);
    setIsAnimating(true);
  };

  return (
    <>
      <StMain>
        <header className="header">
          <div className="header_box">
            <img src="./logo.svg" alt="logo" onClick={showModalHandler} />
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
            </ul>
          </div>

          <article>
            <ul className="goods">
              {listings.map((item) => (
                <ListingItem key={item.id} item={item} />
              ))}
            </ul>
          </article>
        </main>
        <footer className="footer">
          <div className="footer_box">푸터</div>
        </footer>
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
