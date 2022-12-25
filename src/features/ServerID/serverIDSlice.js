import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  serverID: ""
}

// サーバーIDのスライスです
const serverIDSlice = createSlice({
  name: "serverID",
  initialState,
  reducers: {
    // サーバーIDを設定します
    setServerID: (state, action) => {
      const {serverID} = action.payload
      state.serverID = serverID
    }
  }
})

export const {setServerID} = serverIDSlice.actions;

export default serverIDSlice.reducer;