import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  ifCode: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIfCode: (state, action) => {
      state.ifCode = action.payload;
    },
  },
});

export const { setLoading, setUser, setIfCode } = userSlice.actions;

export default userSlice.reducer;
