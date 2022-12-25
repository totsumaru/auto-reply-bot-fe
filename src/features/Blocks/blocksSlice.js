import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: "",
  serverName: "",
  avatarURL: "",
  roles: [
    {
      id: "",
      name: "",
    }
  ],
  adminRoleID: "",
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
  isChanged: false,
}

// 空のブロックです
const emptyBlock = {
  name: "",
  keyword: [""],
  reply: [""],
  isAllMatch: true,
  isRandom: false,
  isEmbed: false,
}

// ブロックのスライスです
const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    // 初期情報を設定します
    initiate: (state, action) => {
      const {token, serverName, avatarURL, blocks} = action.payload
      state.token = token
      state.serverName = serverName
      state.avatarURL = avatarURL
      state.blocks = blocks
      state.isChanged = false
    },
    // サーバー名を更新します
    updateServerName: (state, action) => {
      const {serverName} = action.payload
      state.serverName = serverName
      state.isChanged = true
    },
    // アバターのURLを更新します
    updateAvatarURL: (state, action) => {
      const {avatarURL} = action.payload
      state.avatarURL = avatarURL
      state.isChanged = true
    },
    // 名前を更新します
    updateName: (state, action) => {
      const {blockIndex, name} = action.payload
      state.blocks[blockIndex].name = name
      state.isChanged = true
    },
    // 空のキーワードを追加します
    addKeyword: (state, action) => {
      const {blockIndex} = action.payload
      state.blocks[blockIndex].keyword.push("")
      state.isChanged = true
    },
    // キーワードを変更します
    updateKeyword: (state, action) => {
      const {blockIndex, keywordIndex, value} = action.payload
      state.blocks[blockIndex].keyword[keywordIndex] = value
      state.isChanged = true
    },
    // キーワードを削除します
    deleteKeyword: (state, action) => {
      const {blockIndex, keywordIndex} = action.payload
      state.blocks[blockIndex].keyword.splice(keywordIndex, 1);
      state.isChanged = true
    },
    // 全て/一部 のフラグを変更します
    updateIsAllMatch: (state, action) => {
      const {blockIndex, isAllMatch} = action.payload
      state.blocks[blockIndex].isAllMatch = isAllMatch
      state.isChanged = true
    },
    // 返信のランダムフラグを変更します
    updateIsRandom: (state, action) => {
      const {blockIndex, isRandom} = action.payload
      state.blocks[blockIndex].isRandom = isRandom
      state.isChanged = true
    },
    // 返信を追加します
    addReply: (state, action) => {
      const {blockIndex} = action.payload
      state.blocks[blockIndex].reply.push("")
      state.isChanged = true
    },
    // 返信を変更します
    updateReply: (state, action) => {
      const {blockIndex, replyIndex, value} = action.payload
      state.blocks[blockIndex].reply[replyIndex] = value
      state.isChanged = true
    },
    // 返信を削除します
    deleteReply: (state, action) => {
      const {blockIndex, replyIndex} = action.payload
      state.blocks[blockIndex].reply.splice(replyIndex, 1)
      state.isChanged = true
    },
    // 埋め込みフラグを変更します
    updateIsEmbed: (state, action) => {
      const {blockIndex, isEmbed} = action.payload
      state.blocks[blockIndex].isEmbed = isEmbed
      state.isChanged = true
    },
    // ブロックを追加します
    addBlock: (state) => {
      state.blocks.push(emptyBlock)
      state.isChanged = true
    },
    // ブロックを削除します
    deleteBlock: (state, action) => {
      const {blockIndex} = action.payload
      state.blocks.splice(blockIndex, 1)
      state.isChanged = true
    },
    // 更新済みフラグを解除します
    setUnChange: (state) => {
      state.isChanged = false
    }
  }
})

export const {
  updateName,
  initiate,
  addKeyword,
  updateKeyword,
  deleteKeyword,
  updateIsAllMatch,
  updateIsRandom,
  updateIsEmbed,
  addReply,
  updateReply,
  deleteReply,
  addBlock,
  deleteBlock,
  setUnChange,
} = blocksSlice.actions;

export default blocksSlice.reducer;