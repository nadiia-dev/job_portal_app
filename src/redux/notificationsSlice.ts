import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notification",
  initialState: {
    read: [],
    unread: [],
    reload: true,
  },
  reducers: {
    setReadNotifications: (state, action) => {
      state.read = action.payload;
    },
    setUnreadNotifications: (state, action) => {
      state.unread = action.payload;
    },
    setReloadNotifications: (state, action) => {
      state.reload = action.payload;
    },
  },
});

export const {
  setReadNotifications,
  setUnreadNotifications,
  setReloadNotifications,
} = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
