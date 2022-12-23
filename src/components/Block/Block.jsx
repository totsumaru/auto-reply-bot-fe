import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AddKeywordBtn} from "./AddKeywordBtn";
import {KeywordField} from "./KeywordField";
import {IsAllMatchRadioGroup} from "./IsAllMatchRadioGroup";
import {IsRandomRadioGroup} from "./IsRandomRadioGroup";
import {ReplyField} from "./ReplyField";
import {AddReplyBtn} from "./AddReplyBtn";
import {IsEmbedRadioGroup} from "./IsEmbedRadioGroup";
import {BlockAlert} from "./BlockAlert";
import {Subtitle} from "./Subtitle";
import {NameField} from "./NameField";

// 1つのブロックです
export const Block = ({block}) => {
  return (
    <Box sx={{mt: 2}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{block.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>

          {/* 表示名 */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="1. 表示名（管理画面のみ）"/>
            <NameField
              name={block.name}
              blockID={block.id}
            />
          </Box>

          {/* キーワード */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="2. キーワード"/>
            <IsAllMatchRadioGroup/>
            {/* TODO: mapで出力すること */}
            <KeywordField label="キーワード1"/>
            <AddKeywordBtn/>
          </Box>

          {/* 返信 */}
          <Box borderBottom={0.5} sx={{p: 2}}>
            <Subtitle text="3. 返信"/>
            <IsRandomRadioGroup/>
            {/* TODO: mapで出力すること */}
            <ReplyField label="返信1"/>
            <AddReplyBtn/>
          </Box>

          {/* 返信の表示形式 */}
          <Box borderBottom={0} sx={{p: 2}}>
            <Subtitle text="4. 返信の表示形式"/>
            <IsEmbedRadioGroup/>
          </Box>

          <BlockAlert text="変更した場合は、必ず保存をしてください。"/>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}