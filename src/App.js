import React, {useEffect, useState} from "react"
import axios from "axios";
import {Alert, Backdrop, Box, CircularProgress, Container, Tab, Typography} from "@mui/material";
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
import {NicknameDialog} from "./components/NicknameDialog";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Restrict} from "./components/URL/Restrict";
import {AllowURLCheckbox} from "./components/URL/AllowURLCheckbox";
import {AllowChannelSelector} from "./components/URL/AllowChannelSelector";
import {AllowRoleSelector} from "./components/URL/AllowRoleSelector";
import {AlertChannelSelector} from "./components/URL/AlertChannelSelector";

const App = () => {
  const dispatch = useDispatch();
  const {blocks, isChanged, nickname} = useSelector(state => state.blocks);
  const [param] = useSearchParams();
  const serverID = param.get("id");
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

      data.channel.forEach((channel) => {
        const channelRes = {
          id: channel.id,
          name: channel.name
        }
        channels.push(channelRes)
      })

      dispatch(initiate({
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
            allowRoleID: data.rule.url.allow_role_id,
            allowChannelID: data.rule.url.allow_channel_id,
            alertChannelID: data.rule.url.alert_channel_id,
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
                  <Tab label="基本設定" value="1"/>
                  <Tab label="URL制限" value="2"/>
                </TabList>
              </Box>

              {/* 1.基本設定タブ */}
              <TabPanel value="1">
                {/* ニックネーム */}
                <NicknameDialog nickname={nickname}/>

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
                {blocks.length >= 30
                  ? <Typography sx={{mt: 2}}>上限は30です</Typography>
                  : <BlockAddBtn/>
                }

                {/* 保存ボタン */}
                <SaveBtn color="primary"/>
              </TabPanel>

              {/* 2.URL制限タブ */}
              <TabPanel value="2">
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
                <Title content="5. ログを通知するチャンネル"/>
                <Typography variant="caption">
                  ※許可していないURLが投稿された時に、ログを通知するチャンネルです。<br/>
                  ※運営メンバーだけが見れるチャンネルにしてください。
                </Typography>

                {/* アラートチャンネル */}
                <AlertChannelSelector/>

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
