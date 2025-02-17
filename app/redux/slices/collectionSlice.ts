import { createSlice } from "@reduxjs/toolkit";

interface createCollection {
  collection: {
    open: boolean;
  };
}

const initialState: createCollection = {
  collection: {
    open: false,
  },
};

const collectionSlice = createSlice({
  name: "collection",
  initialState, // Ensure 'name' is a string
  reducers: {
    setCollection: (state, action) => {
      state.collection = { ...state.collection, ...action.payload };
    },
  },
});

export const { setCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
