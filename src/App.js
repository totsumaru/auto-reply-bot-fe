import React, {useEffect, useState} from "react"
import axios from "axios";
import {Backdrop, CircularProgress, Container, Typography} from "@mui/material";
import {Header} from "./components/Header/Header";
import {Title} from "./components/Title";
import {Block} from "./components/Block/Block";
import {SaveBtn} from "./components/SaveBtn";
import {BlockAddBtn} from "./components/BlockAddBtn";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {initiate} from "./features/Blocks/blocksSlice";
import {setServerID} from "./features/ServerID/serverIDSlice";
import {SaveAlert} from "./components/SaveAlert";
import {RoleSelector} from "./components/RoleSelector";
import {ErrorHome} from "./components/ErrorHome";

const App = () => {
  const dispatch = useDispatch();
  const {blocks, isChanged} = useSelector(state => state.blocks);
  const [param] = useSearchParams();
  const serverID = param.get("id");
  const code = param.get("code");
  const [loading, setLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);

  // バックエンドからデータを取得します
  const getData = async (id, code) => {
    try {
      const url = `${process.env.REACT_APP_BE_ROOT_URL}/server?id=${id}&code=${code}`
      const res = await axios.get(url)
      const data = res.data

      // BEのレスポンスからstoreの形式にマッピング
      const blocks = []
      const roles = []

      data.block.forEach((bl) => {
        const blockRes = {
          name: bl.name,
          keyword: bl.keyword,
          reply: bl.reply,
          matchCondition: bl.match_condition,
          isRandom: bl.is_random,
          isEmbed: bl.is_embed,
        }
        blocks.push(blockRes)
      })

      data.role.forEach((role) => {
        const roleRes = {
          id: role.id,
          name: role.name
        }
        roles.push(roleRes)
      })

      dispatch(initiate({
        token: data.token,
        serverName: data.server_name,
        avatarURL: data.avatar_url,
        roles: roles,
        adminRoleID: data.admin_role_id,
        blocks: blocks,
      }))
      dispatch(setServerID({serverID: serverID}))

      setIsErr(false)
      setLoading(false)
    } catch (error) {
      setIsErr(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true);
    (async () => {
      await getData(serverID, code)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header/>

      {isErr ? (
        <ErrorHome/>
      ) : (
        <>
          {/* body全体のコンテナ */}
          <Container maxWidth="md" sx={{mb: 30}}>
            {/* 保存メッセージ */}
            {isChanged && <SaveAlert/>}

            {/* タイトル */}
            <Title content="1. 管理者のロールを設定してください"/>
            {/* 注意事項 */}
            <Typography variant="caption">
              ※誤って変更しないように注意してください。<br/>
              ※変更後のロールを保持していないと修正・保存ができなくなります。
            </Typography>

            {/* ロール選択 */}
            <RoleSelector/>

            {/* タイトル */}
            <Title content="2. キーワードと返信を設定してください"/>

            {/* Blockを繰り返し表示 */}
            {blocks.map((block, index) => {
              return <Block
                key={index}
                blockIndex={index}
                block={block}
              />
            })}

            {/* ブロック追加ボタン */}
            {blocks.length >= 10
              ? <Typography sx={{mt: 2}}>上限は10です</Typography>
              : <BlockAddBtn/>
            }

            {/* 保存ボタン */}
            <SaveBtn color="primary"/>
          </Container>
        </>
      )
      }
      {/* 初回読み込み時のバックドロップ */}
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    </>
  );
}

export default App;
