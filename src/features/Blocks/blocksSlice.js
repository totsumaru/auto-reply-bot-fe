import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  blocks: [
    {
      id: 0,
      name: "テスト名",
      keyword: ["hello", "world", "hello"],
      reply: [""],
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
      const {blockID, name} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.name = name
    },
    // 空のキーワードを追加します
    addKeyword: (state, action) => {
      const {blockID} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.keyword.push("")
    },
    // キーワードを変更します
    updateKeyword: (state, action) => {
      const {blockID, keywordIndex, value} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.keyword[keywordIndex] = value
    },
    // キーワードを削除します
    deleteKeyword: (state, action) => {
      const {blockID, keywordIndex} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.keyword.splice(keywordIndex, 1);
    },
    // 全て/一部 のフラグを変更します
    updateIsAllMatch: (state, action) => {
      const {blockID, isAllMatch} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.isAllMatch = isAllMatch
    },
    // 返信のランダムフラグを変更します
    updateIsRandom: (state, action) => {
      const {blockID, isRandom} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.isRandom = isRandom
    },
    // 返信を追加します
    addReply: (state, action) => {
      const {blockID} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.reply.push("")
    },
    // 返信を変更します
    updateReply: (state, action) => {
      const {blockID, replyIndex, value} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.reply[replyIndex] = value
    },
    // 返信を削除します
    deleteReply: (state, action) => {
      const {blockID, replyIndex} = action.payload
      const block = state.blocks.find(block => block.id === blockID)
      block.reply.splice(replyIndex, 1)
    },
    // TODO: ブロックを追加します
    // TODO: ブロックを削除します
  }
})

export const {
  updateName,
  addKeyword,
  updateKeyword,
  deleteKeyword,
  updateIsAllMatch,
  updateIsRandom,
  addReply,
  updateReply,
  deleteReply
} = blocksSlice.actions;

export default blocksSlice.reducer;