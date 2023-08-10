import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listingsReducer } from "../reducers/listingsReducer";
import { userCheckReducer } from "../reducers/userReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// 리듀서 여러개를 사용하려면 combineReducers를 사용해야 한다고해서 추가했어요!
// 해당 rootReducer를 createStore에 추가했어요!
const rootReducer = combineReducers({
  userCheckReducer,
  listingsReducer,
});

// 리듀서로 사용할 타입 선언
export type RootState = ReturnType<typeof rootReducer>;

// persistConfig와 아래쪽에 있는 persistor는 새로고침시에도 로그인을 유지하기 위해서 리덕스에 있는 상태값을 로컬스토리지에 저장하는 것을 구현한 부분입니다.
// redux-persist를 사용해서 구현하였습니다.
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userCheckReducer"],
};

//스토어 입니다 createStore에 취소선이 있는거는 reduxtoolkit 쓰라는 권장사항때문에 뜨는거라고합니다 동작하는데는 이상없어용!
const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default store;
