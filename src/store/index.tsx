import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have your rootReducer

const store = configureStore({
  reducer: rootReducer
});

export default store;
