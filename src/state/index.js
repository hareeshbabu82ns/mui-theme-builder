import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import globalReducer from "./globalSlice";
import themeReducer from "./themeSlice";
import { api } from "./api";

const store = configureStore({
  reducer: {
    global: globalReducer,
    theme: themeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export default store;
