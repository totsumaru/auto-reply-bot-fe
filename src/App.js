import React, {useEffect, useState} from "react"
import axios from "axios";
import {Alert, Backdrop, Box, CircularProgress, Container, Tab, Typography} from "@mui/material";
import {Header} from "./components/Header/Header";
import {Title} from "./components/Title";
import {Block} from "./components/Comment/Block/Block";
import {SaveBtn} from "./components/SaveBtn";
import {BlockAddBtn} from "./components/Comment/BlockAddBtn";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {initiate} from "./features/Blocks/blocksSlice";
import {setServerID} from "./features/ServerID/serverIDSlice";
import {SaveAlert} from "./components/Comment/SaveAlert";
import {AdminRoleSelector} from "./components/General/AdminRoleSelector";
import {ErrorHome} from "./components/ErrorHome";
import {NicknameDialog} from "./components/General/NicknameDialog";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Restrict} from "./components/URL/Restrict";
import {AllowURLCheckbox} from "./components/URL/AllowURLCheckbox";
import {AllowChannelSelector} from "./components/URL/AllowChannelSelector";
import {AllowRoleSelector} from "./components/URL/AllowRoleSelector";
import {ChannelSelector} from "./components/Comment/IgnoreChannel/ChannelSelector";

const App = () => {
  const dispatch = useDispatch();
  const {blocks, isChanged, nickname} = useSelector(state => state.blocks);
  const [param] = useSearchParams();
  const serverID = param.get("state");
  const code = param.get("code");
  const [loading, setLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [value, setValue] = React.useState('1');

  // バックエンドからデータを取得します
  const getData = async (id, code) => {
    try {
      const url = `${process.env.REACT_APP_BE_ROOT_URL}/server?id=${id}&code=${code}`
      const res = await axios.get(url)
      const data = res.data

      // BEのレスポンスからstoreの形式にマッピング
      const blocks = []
      const roles = []
      const channels = []

      data.comment.block.forEach((bl) => {
        const blockRes = {
          name: bl.name,
          keyword: bl.keyword,
          reply: bl.reply,
          matchCondition: bl.match_condition,
          limitedChannelID: bl.limited_channel_id,
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

      data.channel.forEach((channel) => {
        const channelRes = {
          id: channel.id,
          name: channel.name
        }
        channels.push(channelRes)
      })

      dispatch(initiate({
        ignoreChannelID: data.comment.ignore_channel_id,
        token: data.token,
        serverName: data.server_name,
        avatarURL: data.avatar_url,
        roles: roles,
        channels: channels,
        adminRoleID: data.admin_role_id,
        blocks: blocks,
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
      dispatch(setServerID({serverID: serverID}))

      setIsErr(false)
      setLoading(false)
    } catch (error) {
      setIsErr(true)
      setLoading(false)
    }
  }

  // タブの変更の関数
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            {/* タブ */}
            <TabContext value={value}>
              <Box sx={{
                mx: 2,
                mt: 1,
                borderBottom: 1,
                borderColor: 'divider',
              }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="全体設定" value="1"/>
                  <Tab label="自動返信" value="2"/>
                  <Tab label="URL制限" value="3"/>
                </TabList>
              </Box>

              {/* 1.全体設定タブ -------------------------------------------- */}
              <TabPanel value="1">
                {/* 説明 */}
                <Typography variant="caption" sx={{display: "block", mb: 2}}>
                  botの全体に関わる設定です。
                </Typography>

                {/* タイトル */}
                <Title content="1. 管理者のロールを設定してください"/>
                {/* 注意事項 */}
                <Typography variant="caption">
                  ※誤って変更しないように注意してください。<br/>
                  ※変更後のロールを保持していないと修正・保存ができなくなります。
                </Typography>
                {/* ロール選択 */}
                <AdminRoleSelector/>

                {/* タイトル */}
                <Title content="2.（任意）botのニックネームを変更できます"/>
                <Typography variant="caption" sx={{display: "block", mb: 2}}>
                  ※bot名はこのサーバーでのみ適用されます。
                </Typography>
                {/* ニックネーム */}
                <NicknameDialog nickname={nickname}/>

                {/* 保存ボタン */}
                <SaveBtn color="primary"/>
              </TabPanel>

              {/* 2.自動返信タブ -------------------------------------------- */}
              <TabPanel value="2">
                {/* 説明 */}
                <Typography variant="caption" sx={{display: "block", mb: 2}}>
                  自動返信の設定です。<br/>
                  特定のキーワードに自動で返信することができます。
                </Typography>

                {/* 保存メッセージ */}
                {isChanged && <SaveAlert/>}

                {/* タイトル */}
                <Title content="1.（任意）自動返信を発動しないチャンネル"/>
                <ChannelSelector/>

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
                {blocks.length >= 30
                  ? <Typography sx={{mt: 2}}>上限は30です</Typography>
                  : <BlockAddBtn/>
                }

                {/* 保存ボタン */}
                <SaveBtn color="primary"/>
              </TabPanel>

              {/* 3.URL制限タブ -------------------------------------------- */}
              <TabPanel value="3">
                <Alert severity="error">
                  [注意事項]<br/>
                  基本的にはDiscordの権限設定にて、安全を確保してください。<br/>
                  botは補助的に使用してください。
                </Alert>
                {/* タイトル */}
                <Title content="1. URL制限をしますか？"/>

                {/* URL制限の選択 */}
                <Restrict/>

                {/* タイトル */}
                <Title content="2. 以下のURLは許可します"/>

                {/* 許可するURL */}
                <AllowURLCheckbox/>

                {/* タイトル */}
                <Title content="3. 制限を受けないチャンネル(上限10)"/>

                {/* URL制限をしないチャンネル */}
                <AllowChannelSelector/>

                {/* タイトル */}
                <Title content="4. 制限を受けないロール(上限5)"/>
                <Typography variant="caption">
                  ※管理者権限を持っている人でも、ここは設定してください。
                </Typography>

                {/* URL制限をしないロール */}
                <AllowRoleSelector/>

                {/* タイトル */}
                <Title content="5. ログを通知するチャンネル(この項目はまもなく削除されます)"/>
                <Typography variant="caption">
                  ※1/20に仕様変更したため、この項目は不要となります。<br/>
                  ※このためにチャンネルを用意して頂いていた場合は、削除してください。
                </Typography>

                {/* 保存ボタン */}
                <Box sx={{mt: 2}}>
                  <SaveBtn color="primary"/>
                </Box>

              </TabPanel>
            </TabContext>
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
