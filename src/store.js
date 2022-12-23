import {configureStore} from "@reduxjs/toolkit"
import blocksReducer from "./features/Blocks/blocksSlice";

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
  },
})