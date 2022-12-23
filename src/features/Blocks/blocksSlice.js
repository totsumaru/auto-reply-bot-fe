import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  blocks: [
    {
      name: "",
      keyword: [],
      reply: [],
      isAllMatch: true,
      isRandom: false,
      isEmbed: false,
    }
  ],
}

// ブロックのスライスです
const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    // 名前を更新します
    updateName: (state, action) => {
      const {value} = action.payload
      state.blocks.name = value
    },
    // 空のキーワードを追加します
    addKeyword: (state, action) => {
      const {blockIndex} = action.payload
      state.blocks[blockIndex].keyword.push("")
    },
    // キーワードを変更します
    updateKeyword: (state, action) => {
      const {blockIndex, keywordIndex, value} = action.payload
      state.blocks[blockIndex].keyword[keywordIndex] = value
    },
    // キーワードを削除します
    deleteKeyword: (state, action) => {
      const {blockIndex, keywordIndex} = action.payload
      state.blocks[blockIndex].keyword.splice(keywordIndex, 1)
    },
    // 全て/一部 のフラグを変更します
    updateIsAllMatch: (state, action) => {
      const {blockIndex, isAllMatch} = action.payload
      state.blocks[blockIndex].isAllMatch = isAllMatch
    },
    // 返信のランダムフラグを変更します
    updateIsRandom: (state, action) => {
      const {blockIndex, isRandom} = action.payload
      state.blocks[blockIndex].isRandom = isRandom
    },
    // 返信を追加します
    addReply: (state, action) => {
      const {blockIndex} = action.payload
      state.blocks[blockIndex].reply.push("")
    },
    // 返信を変更します
    updateReply: (state, action) => {
      const {blockIndex, replyIndex, value} = action.payload
      state.blocks[blockIndex].keyword[replyIndex] = value
    },
    // 返信を削除します
    deleteReply: (state, action) => {
      const {blockIndex, replyIndex} = action.payload
      state.blocks[blockIndex].reply.splice(replyIndex, 1)
    },
  }
})

export const {
  updateName,
  addKeyword,
  updateKeyword,
  deleteKeyword,
  updateIsRandom,
  addReply,
  updateReply,
  deleteReply
} = blocksSlice.actions;

export default blocksSlice.reducer;