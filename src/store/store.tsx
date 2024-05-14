// Import necessary modules
import { configureStore } from "@reduxjs/toolkit";

// Define action types
const SET_SEARCH_API_URL_OPT = "SET_SEARCH_API_URL";
const SET_CARD_API_URL_OPT = "SET_CARD_API_URL";
const RESET_REDUX_STORE = "RESET_REDUX_STORE";

// Define initial state
interface APIUrlOpt {
  searchAPIUrlOpt: string;
  cardAPIUrlOpt: string;
}

// Define actions
interface SetSearchAPIUrlOptAction {
  type: typeof SET_SEARCH_API_URL_OPT;
  payload: string;
}

interface SetCardAPIUrlOptAction {
  type: typeof SET_CARD_API_URL_OPT;
  payload: string;
}
interface SetResetRedux {
  type: typeof RESET_REDUX_STORE;
  payload: string;
}

type ActionTypes =
  | SetSearchAPIUrlOptAction
  | SetCardAPIUrlOptAction
  | SetResetRedux;

const initialState: APIUrlOpt = {
  searchAPIUrlOpt: `search?q=lang:en&page=1`,
  cardAPIUrlOpt: "",
};

// Define action creators
export const setSearchAPIUrl = (url: string): SetSearchAPIUrlOptAction => ({
  type: SET_SEARCH_API_URL_OPT,
  payload: url,
});

export const setCardAPIUrl = (url: string): SetCardAPIUrlOptAction => ({
  type: SET_CARD_API_URL_OPT,
  payload: url,
});
export const resetReduxStore = () => ({
  type: RESET_REDUX_STORE,
});

// Define reducer
const reducer = (state = initialState, action: ActionTypes): APIUrlOpt => {
  switch (action.type) {
    case SET_SEARCH_API_URL_OPT:
      return {
        ...state,
        searchAPIUrlOpt: `search?q=${action.payload}+lang:en&page=1`,
      };
    case SET_CARD_API_URL_OPT:
      return {
        ...state,
        cardAPIUrlOpt: action.payload,
      };
    case RESET_REDUX_STORE:
      return initialState;
    default:
      return state;
  }
};

// Create Redux store
const store = configureStore({ reducer });

export default store;
