import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    addLikes: (state, action) => {
      state.value = action.payload;
    },
    removeLikes: (state, action) => {
      state.value = null;
    },
  },
});

export const { addLikes, removeLikes } = likesSlice.actions;
export default likesSlice.reducer;
