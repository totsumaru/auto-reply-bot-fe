import React, {useState} from "react";
import axios from "axios";
import {Alert, Backdrop, Box, Button, CircularProgress, Snackbar} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useDispatch, useSelector} from "react-redux";
import {initiate} from "../features/Blocks/blocksSlice";

// 保存ボタンです
export const SaveBtn = ({color}) => {
  const dispatch = useDispatch();
  const {serverID} = useSelector(state => state.serverID);
  const {token, blocks, adminRoleID, rule} = useSelector(state => state.blocks);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // データを保存します
  const saveData = async () => {
    // ローディングをONにする
    setLoading(true)

    try {
      const url = `${process.env.REACT_APP_BE_ROOT_URL}/server/config?id=${serverID}`

      // -------------------------------------
      // バリデーション
      // -------------------------------------

      // 管理者のロールIDのバリデーションを実行します
      if (!adminRoleID) {
        setLoading(false)
        alert("管理者のロールが設定されていません")
        return
      }

      // ブロックステートのバリデーションを実行します
      const errMsgBlocks = validateBlocks({blocks: blocks})
      if (errMsgBlocks !== "") {
        setLoading(false)
        alert(errMsgBlocks)
        return
      }

      // URL制御のバリデーションを実行します
      const errMsgURLRule = validateURLRule({urlRule: rule.url})
      if (errMsgURLRule !== "") {
        setLoading(false)
        alert(errMsgURLRule)
        return
      }

      // -------------------------------------
      // POSTリクエストの送信
      // -------------------------------------

      // ブロックのリクエストです
      const blocksReq = []
      blocks.forEach((block) => {
        const blockReq = {
          name: block.name,
          keyword: block.keyword,
          reply: block.reply,
          match_condition: block.matchCondition,
          is_random: block.isRandom,
          is_embed: block.isEmbed,
        }
        blocksReq.push(blockReq)
      })

      // POSTリクエストを送信します
      const data = (await axios.post(url, {
          admin_role_id: adminRoleID,
          block: blocksReq,
          rule: {
            url: {
              is_restrict: rule.url.isRestrict,
              is_youtube_allow: rule.url.isYoutubeAllow,
              is_twitter_allow: rule.url.isTwitterAllow,
              is_gif_allow: rule.url.isGIFAllow,
              is_opensea_allow: rule.url.isOpenseaAllow,
              is_discord_allow: rule.url.isDiscordAllow,
              allow_role_id: rule.url.allowRoleID,
              allow_channel_id: rule.url.allowChannelID,
            },
          },
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Token': token
          },
        },
      )).data

      // -------------------------------------
      // BEのレスポンスからステートを更新
      // -------------------------------------

      // BEのレスポンスからstoreの形式にマッピング
      const blocksRes = []
      const roles = []
      const channels = []

      data.block.forEach((bl) => {
        const blockRes = {
          name: bl.name,
          keyword: bl.keyword,
          reply: bl.reply,
          matchCondition: bl.match_condition,
          isRandom: bl.is_random,
          isEmbed: bl.is_embed,
        }
        blocksRes.push(blockRes)
      })

      data.role.forEach((role) => {
        const roleRes = {
          id: role.id,
          name: role.name
        }
        roles.push(roleRes)
      })

      data.channel.forEach((channel) => {
        const channelRes = {
          id: channel.id,
          name: channel.name
        }
        channels.push(channelRes)
      })

      dispatch(initiate({
        token: token,
        serverName: data.server_name,
        avatarURL: data.avatar_url,
        roles: roles,
        channels: channels,
        adminRoleID: data.admin_role_id,
        blocks: blocksRes,
        nickname: data.nickname,
        rule: {
          url: {
            isRestrict: data.rule.url.is_restrict,
            isYoutubeAllow: data.rule.url.is_youtube_allow,
            isTwitterAllow: data.rule.url.is_twitter_allow,
            isGIFAllow: data.rule.url.is_gif_allow,
            isOpenseaAllow: data.rule.url.is_opensea_allow,
            isDiscordAllow: data.rule.url.is_discord_allow,
            allowRoleID: data.rule.url.allow_role_id,
            allowChannelID: data.rule.url.allow_channel_id,
          },
        },
      }))

      // ローディングの終了
      setLoading(false)
      // Successメッセージの送信
      setSuccess(true)
    } catch (error) {
      setLoading(false)
      alert("[ERROR]エラーが発生しました。内容を確認し、再度実行してください。")
    }
  }

  return (
    <>
      <Box sx={{textAlign: "right"}}>
        {/* ===== 保存ボタン ===== */}
        <Button
          variant="contained"
          color={color}
          startIcon={<SaveIcon/>}
          onClick={async (e) => {
            e.preventDefault()
            await saveData()
          }}
        >
          保存する
        </Button>
      </Box>

      {/* ===== 保存ボタン押下時のローディング ===== */}
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>

      {/* ===== 保存完了時のsnackbar ===== */}
      <Snackbar
        open={success}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          variant="filled"
          severity="success"
          sx={{width: '100%'}}
        >
          保存に成功しました！
        </Alert>
      </Snackbar>
    </>
  )
}

// 全てのブロックのステートにバリデーションをかけます
const validateBlocks = ({blocks}) => {
  for (const [index, block] of blocks.entries()) {
    // ブロック名のバリデーションです
    if (block.name === "") {
      return `${index + 1}つ目の表示名が入力されていません`
    }
    if (block.name.length > 20) {
      return (`${index + 1}つ目の表示名が最大文字数を超えています`)
    }

    // キーワードのバリデーションです
    for (const keyword of block.keyword) {
      if (keyword === "") {
        return (`「${block.name}」のキーワードが入力されていません`)
      }

      if (keyword.length > 20) {
        return (`「${block.name}」のキーワードが最大文字数を超えています`)
      }
    }

    // 返信のバリデーションです
    for (const reply of block.reply) {
      if (reply === "") {
        return (`「${block.name}」の返信が入力されていません`)
      }

      if (reply.length > 500) {
        return (`「${block.name}」の返信が最大文字数を超えています`)
      }
    }

    // ランダムフラグのバリデーションです
    if (!block.isRandom) {
      if (block.reply.length > 1) {
        return (`「${block.name}」の返信は固定のため、1つしか設定できません`)
      }
    }
  }

  return ""
}

// URL制限のバリデーションを実行します
const validateURLRule = ({urlRule}) => {
  // 空のチャンネルIDが設定されていないか確認します
  for (const channelID of urlRule.allowChannelID) {
    if (channelID === "") {
      return "3. 制限を受けないチャンネルが空です。設定しない場合はフォームを削除してください。"
    }
  }

  // 空のロールIDが設定されていないか確認します
  for (const roleID of urlRule.allowRoleID) {
    if (roleID === "") {
      return "4. 制限を受けないロールが空です。設定しない場合はフォームを削除してください。"
    }
  }

  // チャンネルIDが重複していないか確認します
  if (new Set(urlRule.allowChannelID).size !== urlRule.allowChannelID.length) {
    return "チャンネルが重複しています"
  }

  // ロールIDが重複していないか確認します
  if (new Set(urlRule.allowRoleID).size !== urlRule.allowRoleID.length) {
    return "ロールが重複しています"
  }

  return ""
}
