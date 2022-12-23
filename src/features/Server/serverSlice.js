import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  name: "TEST SERVER",
  avatarURL: "",
}

// 接続しているサーバーです
const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    // サーバーの情報を設定します
    setServer: (state, action) => {
      const {name, avatarURL} = action.payload
      state.name = name
      state.avatarURL = avatarURL
    }
  }
})

export const {setServer} = serverSlice.actions;

export default serverSlice.reducer;