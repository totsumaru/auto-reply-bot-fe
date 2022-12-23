import React from "react"
import {Header} from "./components/Header";
import {Container, Typography} from "@mui/material";
import {Title} from "./components/Title";
import {Block} from "./components/Block/Block";
import {SaveBtn} from "./components/SaveBtn";
import {BlockAddBtn} from "./components/BlockAddBtn";
import {useSelector} from "react-redux";

const App = () => {
  const {blocks} = useSelector(state => state.blocks);
  return (
    <>
      <Header/>

      {/* body全体のコンテナ */}
      <Container maxWidth="md" sx={{mb: 30}}>
        <Title/>

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
