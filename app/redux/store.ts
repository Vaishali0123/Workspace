import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import communitySlice from "./slices/communitySlice";
import collectionSlice from "./slices/collectionSlice";
import { settingsApi } from "./slices/settingApi";
import { earnwithusApi } from "./slices/earnwithusApi";
import { fetchComApi } from "./slices/comSlice";

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: {
    user: userSlice,
    createproduct: productSlice,
    createcommunity: communitySlice,
    collection: collectionSlice,

    [settingsApi.reducerPath]: settingsApi.reducer,
    [earnwithusApi.reducerPath]: earnwithusApi.reducer,
    [fetchComApi.reducerPath]: fetchComApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(settingsApi.middleware)
      .concat(earnwithusApi.middleware)
      .concat(fetchComApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
