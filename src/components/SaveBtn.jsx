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
  const {token, blocks} = useSelector(state => state.blocks);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // データを保存します
  const saveData = async ({argBlocks, argToken}) => {
    const BackendURL = "http://localhost:8080"

    // ローディングをONにする
    setLoading(true)

    // TODO: 全てにバリデーションをかける #2

    try {
      const url = `${BackendURL}/server/config?id=${serverID}`

      const blocksReq = []
      argBlocks.forEach((block) => {
        const blockReq = {
          name: block.name,
          keyword: block.keyword,
          reply: block.reply,
          is_all_match: block.isAllMatch,
          is_random: block.isRandom,
          is_embed: block.isEmbed,
        }
        blocksReq.push(blockReq)
      })

      // TODO: tokenをBEから取得 #3
      const data = (await axios.post(url, {
          admin_role_id: "1055362036495826964",
          block: blocksReq,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Token': argToken
          },
        },
      )).data

      // BEのレスポンスからstoreの形式にマッピング
      const blocks = []

      data.block.forEach((bl) => {
        const blockRes = {
          name: bl.name,
          keyword: bl.keyword,
          reply: bl.reply,
          isAllMatch: bl.is_all_match,
          isRandom: bl.is_random,
          isEmbed: bl.is_embed,
        }

        blocks.push(blockRes)
      })

      dispatch(initiate({
        token: "sample-token",
        serverName: data.server_name,
        avatarURL: data.avatar_url,
        blocks: blocks,
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
        <Button
          variant="contained"
          color={color}
          startIcon={<SaveIcon/>}
          onClick={async (e) => {
            e.preventDefault()
            await saveData({
              argBlocks: blocks,
              argToken: token
            })
          }}
        >
          保存する
        </Button>
      </Box>

      {/* 保存ボタン押下時のローディング */}
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>

      {/* 保存完了時のsnackbar */}
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