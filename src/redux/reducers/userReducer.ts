import { UserData } from "../../pages/Auth";
import { LOGIN_USER, LOGOUT_USER, login, logout } from "../actions/userActions";

interface userStateType {
  User: UserData;
}

const initialState: userStateType = {
  User: {
    id: 0,
    nickname: "",
    loggedIn: false,
  },
};

type UserCheckAction = ReturnType<typeof login> | ReturnType<typeof logout>;
// 위 방법으로 사용할 수 있다고 해서 써봤는데 payload를 인식을 못함
// 좀더 찾아보고 정리해봐야할듯
// type 에서 as const 를 추가 해주면 typeof 로 action 자체를 불러올 수 있음
// 이전에 안되었던 이유가 as const를 작성해주지 않으면 action을 string으로 받아와진다고함
// const assertions 라는 타입스크립트 문법

// type UserCheckAction =
//   | { type: typeof LOGIN_USER; payload: UserData }
//   | { type: typeof LOGOUT_USER };

// user의 로그인 유지와 로그아웃을 위한 Reducer
export const userCheckReducer = (
  prevState = initialState,
  action: UserCheckAction
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...prevState,
        User: {
          id: action.payload.id,
          nickname: action.payload.nickname,
          loggedIn: action.payload.loggedIn,
        },
      };
    case LOGOUT_USER:
      return {
        ...prevState,
        User: {
          id: 0,
          nickname: "",
          loggedIn: false,
        },
      };
    default:
      return prevState;
  }
};
