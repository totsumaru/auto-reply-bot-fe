import React, {useEffect} from "react"
import axios from "axios";
import {Container, Typography} from "@mui/material";
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

const App = () => {
  const dispatch = useDispatch();
  const {blocks, isChanged} = useSelector(state => state.blocks);
  const [param] = useSearchParams();
  const serverID = param.get("id");

  const BackendURL = "http://localhost:8080"

  // バックエンドからデータを取得します
  const getData = async (id) => {
    try {
      const url = `${BackendURL}/server?id=${id}`
      const data = (await axios.get(url)).data

      // BEのレスポンスからstoreの形式にマッピング
      const blocks = []

      data.block.forEach((bl) => {
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
        token: "sample-token-from-useEffect",
        serverName: "サーバー名はBEが実装されてから入れます",
        avatarURL: "",
        blocks: blocks,
      }))
      dispatch(setServerID({serverID: serverID}))
    } catch (error) {
      const {status, statusText} = error.response;
      console.error(`Error! HTTP Status: ${status} ${statusText}`);
    }
  }

  useEffect(() => {
    (async () => {
      await getData(serverID)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header/>

      {/* body全体のコンテナ */}
      <Container maxWidth="md" sx={{mb: 30}}>
        {/* タイトル */}
        <Title/>

        {/* 保存メッセージ */}
        {isChanged && <SaveAlert/>}

        {/* Blockを繰り返し表示 */}
        {blocks.map((block, index) => {
          return <Block
            key={index}
            blockIndex={index}
            block={block}
          />
        })}

        {/* ブロック追加ボタン */}
        {blocks.length >= 20
          ? <Typography sx={{mt: 2}}>上限は20です</Typography>
          : <BlockAddBtn/>
        }

        {/* 保存ボタン */}
        <SaveBtn color="primary"/>
      </Container>
    </>
  );
}

export default App;
