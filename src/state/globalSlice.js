import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "test_user",
  user: { name: "John Doe", ocupation: "Developer" },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload?.user;
      state.userId = payload?.user?._id ? payload?.user._id : "";
    },
  },
});

export const { setUser } = globalSlice.actions;

export default globalSlice.reducer;
