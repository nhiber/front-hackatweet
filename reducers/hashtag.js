import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const hashtagSlice = createSlice({
  name: "hashtag",
  initialState,
  reducers: {
    addHashtag: (state, action) => {
      state.value = action.payload;
    },
    removeHashtag: (state, action) => {
      state.value = null;
    },
  },
});

export const { addHashtag, removeHashtag } = hashtagSlice.actions;
export default hashtagSlice.reducer;
