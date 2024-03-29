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
  channels: [
    {
      id: "",
      name: "",
    }
  ],
  adminRoleID: "",
  ignoreChannelID: [],
  blocks: [
    {
      name: "",
      keyword: [],
      reply: [],
      matchCondition: "all-contain",
      limitedChannelID: [],
      isRandom: false,
      isEmbed: false,
    }
  ],
  isChanged: false,
  nickname: "Comment-bot",
  rule: {
    url: {
      isRestrict: false,
      isYoutubeAllow: false,
      isTwitterAllow: false,
      isGIFAllow: false,
      isOpenseaAllow: false,
      isDiscordAllow: false,
      allowRoleID: [],
      allowChannelID: [],
    },
  },
}

// 空のブロックです
const emptyBlock = {
  name: "",
  keyword: [""],
  reply: [""],
  matchCondition: "all-contain",
  limitedChannelID: [],
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
      const {
        ignoreChannelID,
        token,
        serverName,
        avatarURL,
        roles,
        channels,
        adminRoleID,
        blocks,
        nickname,
        rule,
      } = action.payload
      state.ignoreChannelID = ignoreChannelID
      state.token = token
      state.serverName = serverName
      state.avatarURL = avatarURL
      state.roles = roles
      state.channels = channels
      state.adminRoleID = adminRoleID
      state.blocks = blocks
      state.isChanged = false
      state.nickname = nickname
      state.rule = rule
    },
    // 管理者ロールIDを更新します
    updateAdminRoleID: (state, action) => {
      const {adminRoleID} = action.payload
      state.adminRoleID = adminRoleID
      state.isChanged = true
    },
    // コメントを無視するチャンネルを変更します
    updateIgnoreChannelID: (state, action) => {
      const {index, channelID} = action.payload
      state.ignoreChannelID[index] = channelID
    },
    // コメントを無視するチャンネルを追加します
    addIgnoreChannelID: (state, action) => {
      state.ignoreChannelID.push("")
    },
    // コメントを無視するチャンネルを削除します
    deleteIgnoreChannelID: (state, action) => {
      const {index} = action.payload
      state.ignoreChannelID.splice(index, 1);
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
    // キーワードの一致条件を変更します
    updateMatchCondition: (state, action) => {
      const {blockIndex, matchCondition} = action.payload
      state.blocks[blockIndex].matchCondition = matchCondition
      state.isChanged = true
    },
    // 空の限定実行チャンネルを追加します
    addLimitedChannelID: (state, action) => {
      const {blockIndex} = action.payload
      state.blocks[blockIndex].limitedChannelID.push("")
      state.isChanged = true
    },
    // 限定実行チャンネルを変更します
    updateLimitedChannelID: (state, action) => {
      const {blockIndex, limitedChannelIDIndex, value} = action.payload
      state.blocks[blockIndex].limitedChannelID[limitedChannelIDIndex] = value
      state.isChanged = true
    },
    // 限定実行チャンネルを削除します
    deleteLimitedChannelID: (state, action) => {
      const {blockIndex, limitedChannelIDIndex} = action.payload
      state.blocks[blockIndex].limitedChannelID.splice(limitedChannelIDIndex, 1);
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
    // ニックネームを変更します
    updateNickname: (state, action) => {
      const {nickname} = action.payload
      state.nickname = nickname
    },
    // URL制限を変更します
    updateIsRestrict: (state) => {
      state.rule.url.isRestrict = !state.rule.url.isRestrict
    },
    // YouTubeのURL制限を変更します
    updateYoutubeAllow: (state) => {
      state.rule.url.isYoutubeAllow = !state.rule.url.isYoutubeAllow
    },
    // TwitterのURL制限を変更します
    updateTwitterAllow: (state) => {
      state.rule.url.isTwitterAllow = !state.rule.url.isTwitterAllow
    },
    // GIFのURL制限を変更します
    updateGIFAllow: (state) => {
      state.rule.url.isGIFAllow = !state.rule.url.isGIFAllow
    },
    // OpenseaのURL制限を変更します
    updateOpenseaAllow: (state) => {
      state.rule.url.isOpenseaAllow = !state.rule.url.isOpenseaAllow
    },
    // DiscordのURL制限を変更します
    updateDiscordAllow: (state) => {
      state.rule.url.isDiscordAllow = !state.rule.url.isDiscordAllow
    },
    // 許可するロールを変更します
    updateAllowRoleID: (state, action) => {
      const {index, roleID} = action.payload
      state.rule.url.allowRoleID[index] = roleID
    },
    // 許可するロールを追加します
    addAllowRoleID: (state, action) => {
      state.rule.url.allowRoleID.push("")
    },
    // 許可するロールを削除します
    deleteAllowRoleID: (state, action) => {
      const {index} = action.payload
      state.rule.url.allowRoleID.splice(index, 1);
    },
    // 許可するチャンネルを変更します
    updateAllowChannelID: (state, action) => {
      const {index, channelID} = action.payload
      state.rule.url.allowChannelID[index] = channelID
    },
    // 許可するチャンネルを追加します
    addAllowChannelID: (state, action) => {
      state.rule.url.allowChannelID.push("")
    },
    // 許可するチャンネルを削除します
    deleteAllowChannelID: (state, action) => {
      const {index} = action.payload
      state.rule.url.allowChannelID.splice(index, 1);
    },
  }
})

export const {
  initiate,
  updateAdminRoleID,
  updateIgnoreChannelID,
  addIgnoreChannelID,
  deleteIgnoreChannelID,
  updateName,
  addKeyword,
  updateKeyword,
  deleteKeyword,
  updateMatchCondition,
  addLimitedChannelID,
  updateLimitedChannelID,
  deleteLimitedChannelID,
  updateIsRandom,
  addReply,
  updateReply,
  deleteReply,
  updateIsEmbed,
  addBlock,
  deleteBlock,
  updateNickname,
  updateIsRestrict,
  updateYoutubeAllow,
  updateTwitterAllow,
  updateGIFAllow,
  updateOpenseaAllow,
  updateDiscordAllow,
  updateAllowRoleID,
  addAllowRoleID,
  deleteAllowRoleID,
  updateAllowChannelID,
  deleteAllowChannelID,
  addAllowChannelID,
} = blocksSlice.actions;

export default blocksSlice.reducer;