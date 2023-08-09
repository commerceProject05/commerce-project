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
import { Listing } from "../data/FilterTypeData";

const Main = () => {
  type RootState = {
    allListings: Listing[];
    filteredListings: Listing[];
  };

  const dispatch = useDispatch();
  const listings = useSelector((state: RootState) => state.filteredListings);

  useEffect(() => {
    dispatch(setListings(data));
  }, [dispatch]);

  const handleFilterClick = (tag: string) => {
    if (tag === "like") {
      dispatch(sortByLikes());
    } else {
      dispatch(filterListings(tag));
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <StMain>
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
  );
};

export default Main;
