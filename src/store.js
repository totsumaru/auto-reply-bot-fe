import {configureStore} from "@reduxjs/toolkit"
import blocksReducer from "./features/Blocks/blocksSlice";
import serverReducer from "./features/Server/serverSlice";

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    server: serverReducer,
  },
})