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
import Search from "../components/Search";

type RootState = {
  allListings: Listing[];
  filteredListings: Listing[];
};

const Main = () => {

  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const listings = useSelector((state: RootState) => state.filteredListings);

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
  const search = (input:string) => {
    setSearchInput(input);
  }

  // 검색어 키워드가 있는데 필터링한 list가 없을때 alert창 띄운후 모든 리스트 나타냄(임시)
  const searchCheck = (input:string) => {
    let length = input.length;
    console.log('length',input.length);
    if (length > 0 && listings.length < 1) {
      console.log('안되나');
      alert('해당 검색어의 에어비엔비 상품을 찾을 수 없습니다.')
      dispatch(setListings(data));
      setSearchInput('');
    }
  }

  console.log('listings', listings);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <StMain>
        <header className="header">
          <div className="header_box">
            <img src="./logo.svg" alt="logo" />
            <Search search={search}/>
            <div className="header_box_login">로그인</div>
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
    </>
  );
};

export default Main;
