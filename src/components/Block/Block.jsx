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

export const Block = ({title}) => {
  return (
    <Box sx={{mt: 2}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>キーワード</p>
          <IsAllMatchRadioGroup/>
          {/* TODO: mapで出力すること */}
          <KeywordField label="キーワード1"/>
          <KeywordField label="キーワード2"/>
          <KeywordField label="キーワード3"/>
          <KeywordField label="キーワード4"/>
          <AddKeywordBtn/>

          <p>返信</p>
          <IsRandomRadioGroup/>
          <ReplyField label="返信1"/>
          <ReplyField label="返信2"/>
          <ReplyField label="返信3"/>
          <ReplyField label="返信4"/>
          <AddReplyBtn/>

          <p>返信の表示方法</p>
          <IsEmbedRadioGroup/>

          <BlockAlert text="変更した場合は、必ず保存をしてください。"/>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}