// action type 설정하기
export const SET_LISTINGS = "SET_LISTINGS";
export const FILTER_LISTINGS = "FILTER_LISTINGS";
export const SORT_BY_LIKES = "SORT_BY_LIKES";
export const FILTER_SEARCH = "FILTER_SEARCH";
export const FILTER_PRICES = "FILTER_PRICE";

// 액션 생성 기본 , 필터, 좋아요, 검색, 가격필터 정렬
export const setListings = (listings: Listing[]) => ({
  type: SET_LISTINGS,
  payload: listings,
});

export const filterListings = (tag: string) => ({
  type: FILTER_LISTINGS,
  payload: tag,
});

export const sortByLikes = () => ({
  type: SORT_BY_LIKES,
});

export const filterSearch = (location: string) => ({
  type: FILTER_SEARCH,
  payload: location,
});

export const filterPrices = (price: Listing[]) => ({
  type: FILTER_PRICES,
  payload: price,
});
