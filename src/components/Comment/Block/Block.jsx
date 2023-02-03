import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AddKeywordBtn} from "./AddKeywordBtn";
import {KeywordField} from "./KeywordField";
import {MatchConditionRadioGroup} from "./MatchConditionRadioGroup";
import {IsRandomRadioGroup} from "./IsRandomRadioGroup";
import {ReplyField} from "./ReplyField";
import {Subtitle} from "./Subtitle";
import {NameField} from "./NameField";
import {AddReplyBtn} from "./AddReplyBtn";
import {IsEmbedRadioGroup} from "./IsEmbedRadioGroup";
import {BlockAlert} from "./BlockAlert";
import {BlockDeleteBtn} from "./BlockDeleteBtn";
import {LimitedChannelSelector} from "./LimitedChannel/LimitedChannelSelector";

// 1つのブロックです
export const Block = ({blockIndex, block}) => {
  // Index | 表示名 を取得します
  const name = block.name === "" ? "表示名を設定してください（必須）" : block.name
  const getName = (blockIndex + 1) + ". " + name
  const keywordMax = 10;
  const replyMax = 10;

  return (
    <Box sx={{mt: 2, mx: 1}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {getName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>

          {/* 1.表示名 */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="1. 表示名（管理画面のみ）"/>
            <NameField
              name={block.name}
              blockIndex={blockIndex}
            />
          </Box>

          {/* 2.キーワード */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="2. キーワード"/>
            {/* ラジオボタン */}
            <MatchConditionRadioGroup
              blockIndex={blockIndex}
              block={block}
            />
            {/* フォーム */}
            {block.keyword.map((keyword, index) => {
              return <KeywordField
                key={index}
                blockIndex={blockIndex}
                keywordIndex={index}
                keyword={keyword}
              />
            })}
            {/* 追加ボタン */}
            {block.keyword.length < keywordMax &&
              <AddKeywordBtn
                blockIndex={blockIndex}
                block={block}
              />
            }
          </Box>

          {/* 3.返信 */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="3. 返信"/>
            {/* ラジオボタン */}
            <IsRandomRadioGroup
              blockIndex={blockIndex}
              block={block}
            />
            {/* フォーム */}
            {block.reply.map((reply, index) => {
              return <ReplyField
                key={index}
                blockIndex={blockIndex}
                replyIndex={index}
                reply={reply}
              />
            })}
            {/* 追加ボタン */}
            {block.reply.length < replyMax &&
              <AddReplyBtn
                blockIndex={blockIndex}
                block={block}
              />
            }
          </Box>

          {/* 4.返信の表示形式 */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="4. 返信の表示形式"/>
            <IsEmbedRadioGroup
              blockIndex={blockIndex}
              block={block}
            />
          </Box>

          {/* TODO: ここを実装 */}
          {/* 5.実行するチャンネルを限定する */}
          <Box borderBottom={0} sx={{p: 2}}>
            <Subtitle text="5. 実行するチャンネルを限定する"/>
            <Typography variant="caption" sx={{display: "block", mb: 2}}>
              設定した場合、そのチャンネルでのみでbotが返信します。
            </Typography>

            <LimitedChannelSelector
              blockIndex={blockIndex}
            />
          </Box>

          {/* 注意事項 */}
          <BlockAlert text="変更した場合は、必ず保存をしてください。"/>
          {/* ブロックの削除ボタン*/}
          <BlockDeleteBtn
            blockIndex={blockIndex}
            name={block.name}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}