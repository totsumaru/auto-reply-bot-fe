import {configureStore} from "@reduxjs/toolkit"
import blocksReducer from "./features/Blocks/blocksSlice";
import serverIDReducer from "./features/ServerID/serverIDSlice";

export const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    serverID: serverIDReducer,
  },
})