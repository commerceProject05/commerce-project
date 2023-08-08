import { Listing } from "../../data/FilterTypeData";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

// action type 설정하기
export const SET_LISTINGS = "SET_LISTINGS";
export const FILTER_LISTINGS = "FILTER_LISTINGS";
export const SORT_BY_LIKES = "SORT_BY_LIKES";

// 액션 생성 기본 , 필터, 좋아요 정렬
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
