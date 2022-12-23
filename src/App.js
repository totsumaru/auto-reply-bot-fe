import React from "react"
import {Header} from "./components/Header";
import {Container} from "@mui/material";
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
      <Container maxWidth="md" sx={{mb: 6}}>
        <Title/>

        {/* Blockを繰り返し表示 */}
        {blocks.map((block, index) => {
          return <Block key={index} block={block}/>
        })}
        <BlockAddBtn/>

        <SaveBtn color="primary"/>
      </Container>
    </>
  );
}

export default App;
