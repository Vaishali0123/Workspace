import { createSlice } from "@reduxjs/toolkit";

interface createCommunityState {
  community: {
    comId: string;
    communityName: string;
    communityDescription: string;
    communityCategory: string;
    communityType: string;
    communityImage: File;
  };
}

const initialState: createCommunityState = {
  community: {
    comId: "",
    communityName: "",
    communityDescription: "",
    communityCategory: "+ Select Category",
    communityType: "public",
    communityImage: {} as File,
  },
};

const communitySlice = createSlice({
  name: "community",
  initialState, // Ensure 'name' is a string
  reducers: {
    setCommunity: (state, action) => {
      state.community = { ...state.community, ...action.payload };
    },
  },
});

export const { setCommunity } = communitySlice.actions;
export default communitySlice.reducer;
