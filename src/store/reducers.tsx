import { combineReducers } from 'redux';

// Define action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Define action interfaces
interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

// Define a union type for all action types
type CounterActionTypes = IncrementAction | DecrementAction;

// Define state interface for the counter reducer
interface CounterState {
  counter: number;
}

// Define initial state for the counter reducer
const initialCounterState: CounterState = {
  counter: 0
};

// Define reducer for the counter slice of state
const counterReducer = (state = initialCounterState, action: CounterActionTypes): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  counter: counterReducer
});

// Define RootState as the type of the combined state
export interface RootState {
  counter: CounterState; // Define other state slices here if applicable
}

export default rootReducer;
