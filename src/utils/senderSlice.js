import { createSlice } from "@reduxjs/toolkit";

const senderSlice = createSlice({
  name: "sender",
  initialState: null,
  reducers: {
    addSender: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSender } = senderSlice.actions;

export default senderSlice.reducer;
