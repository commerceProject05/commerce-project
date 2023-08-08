import {
  SET_LISTINGS,
  FILTER_LISTINGS,
  SORT_BY_LIKES,
} from "../actions/listingsActions";
import { Listing } from "../../data/FilterTypeData";

//데이터가 들어올 initialState 값의 타입설정해주기
interface StateType {
  allListings: Listing[];
  filteredListings: Listing[];
}

//allListings은 전체 데이터 저장소, filteredListings은 실제로 사용자에게 보여지는 저장소 (필터때문에)
const initialState: StateType = {
  allListings: [],
  filteredListings: [],
};

//action에 type이 뭐가 들어오는지에 따라 payload 타입지정
type ListingsAction =
  | { type: typeof SET_LISTINGS; payload: Listing[] }
  | { type: typeof FILTER_LISTINGS; payload: string }
  | { type: typeof SORT_BY_LIKES };

//액션을 수행하는 리듀서 함수입니다.
export const listingsReducer = (
  state = initialState,
  action: ListingsAction
) => {
  switch (action.type) {
    //제일 기본 타입입니다 메인화면 오면 기본적으로 보여줍니다 모든 숙소 다 보여줘요.
    case SET_LISTINGS:
      return {
        ...state,
        allListings: action.payload,
        filteredListings: action.payload,
      };
    //필터 처리하는 타입입니다 파라미터값을 받아와서 tag값에 sea, new, view 값을 가진 숙소들을 각각 필터링합니다.
    case FILTER_LISTINGS:
      if (action.payload === "all") {
        return { ...state, filteredListings: state.allListings };
      }
      return {
        ...state,
        filteredListings: state.allListings.filter((listing) =>
          listing.tag.includes(action.payload)
        ),
      };
    //좋아요 높은 순서대로 정렬해주는 타입입니다
    case SORT_BY_LIKES:
      const sortedListings = [...state.allListings].sort(
        (a, b) => b.like - a.like
      );
      return { ...state, filteredListings: sortedListings };

    default:
      return state;
  }
};
