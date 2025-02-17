import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import communitySlice from "./slices/communitySlice";
import collectionSlice from "./slices/collectionSlice";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    user: userSlice,
    createproduct: productSlice,
    createcommunity: communitySlice,
    collection: collectionSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
