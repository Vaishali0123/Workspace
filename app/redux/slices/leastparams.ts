import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onecom: false,
  maxmembers: 0,
  popularity: 0,
  post: 0,
};

const paramsSlice = createSlice({
  name: "paramslice",
  initialState,
  reducers: {
    setOnecom: (state, action) => {
      state.onecom = action.payload;
    },
    setMaxmembers: (state, action) => {
      state.maxmembers = action.payload;
    },
    setPopularity: (state, action) => {
      state.popularity = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setOnecom, setMaxmembers, setPopularity, setPost } =
  paramsSlice.actions;

export default paramsSlice.reducer;
