import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "idle", // idle | add | edit | delete
};

export const blogSlice = createSlice({
  name: "blogManipulation",
  initialState,
  reducers: {
    setAddMode: (state) => {
      state.mode = "add";
    },
    setEditMode: (state) => {
      state.mode = "edit";
    },
    setDeleteMode: (state) => {
      state.mode = "delete";
    },
    resetMode: (state) => {
      state.mode = "idle";
    },
  },
});

export const { setAddMode, setEditMode, setDeleteMode, resetMode } =
  blogSlice.actions;

export default blogSlice.reducer;
