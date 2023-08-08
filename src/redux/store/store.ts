import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { listingsReducer } from "../reducers/listingsReducer";

//스토어 입니다 createStore에 취소선이 있는거는 reduxtoolkit 쓰라는 권장사항때문에 뜨는거라고합니다 동작하는데는 이상없어용!
const store = createStore(listingsReducer, applyMiddleware(thunk));

export default store;
