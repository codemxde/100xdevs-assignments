import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "input",
  initialState: {
    value: "",
    isActive: false,
    lastInput: "",
  },
  reducers: {
    handleTyping: (state, action) => {
      state.value = action.payload;
    },
    clearInput: (state) => {
      state.value = "";
    },
    setActive: (state, action) => {
      state.isActive = action.payload;
    },
    setLastInput: (state) => {
      state.lastInput = state.value;
    },
  },
});

export const { handleTyping, clearInput, setActive, setLastInput } = inputSlice.actions;
export default inputSlice.reducer;
