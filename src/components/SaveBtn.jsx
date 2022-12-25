import React, {useState} from "react";
import axios from "axios";
import {Box, Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {useDispatch, useSelector} from "react-redux";
import {initiate} from "../features/Blocks/blocksSlice";

// 保存ボタンです
export const SaveBtn = ({color}) => {
  const dispatch = useDispatch();
  const {serverID} = useSelector(state => state.serverID);
  const {token, blocks} = useSelector(state => state.blocks);
  const [loading, setLoading] = useState(false);

  // データを保存します
  const saveData = async ({argBlocks, argToken}) => {
    const BackendURL = "http://localhost:8080"

    // ローディングをONにする
    setLoading(true)

    try {
      const url = `${BackendURL}/server/config?id=${serverID}`

      const blocksReq = []
      argBlocks.forEach((block) => {
        const blockReq = {
          keyword: block.keyword,
          reply: block.reply,
          is_all_match: block.isAllMatch,
          is_random: block.isRandom,
          is_embed: block.isEmbed,
        }
        blocksReq.push(blockReq)
      })

      // TODO: tokenをBEから取得
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
        // TODO: nameをBEから取得
        const blockRes = {
          name: "ブロック名はBEが実装されてから入れます",
          keyword: bl.keyword,
          reply: bl.reply,
          isAllMatch: bl.is_all_match,
          isRandom: bl.is_random,
          isEmbed: bl.is_embed,
        }

        blocks.push(blockRes)
      })

      // TODO: tokenはBEの実装後に修正
      dispatch(initiate({
        token: "sample-token",
        serverName: "サーバー名はBEが実装されてから入れます",
        avatarURL: "",
        blocks: blocks,
      }))

    } catch (error) {
      alert("[ERROR]保存に失敗しました。内容を確認して、再度保存してください。")
    }
  }

  return (
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
  )
}