import { createSlice } from "@reduxjs/toolkit";

interface createProductState {
  product: {
    productName: string;
    productDescription: string;
  };
}

const initialState: createProductState = {
  product: {
    productName: "",
    productDescription: "",
  },
};

const productSlice = createSlice({
  name: "createproduct",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = { ...state.product, ...action.payload };
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
