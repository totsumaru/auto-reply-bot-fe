import React from "react"
import {Header} from "./components/Header";
import {Container} from "@mui/material";
import {Title} from "./components/Title";
import {Block} from "./components/Block/Block";
import {SaveBtn} from "./components/SaveBtn";
import {BlockAddBtn} from "./components/BlockAddBtn";

const App = () => {
  return (
    <>
      <Header/>

      {/* body全体のコンテナ */}
      <Container maxWidth="md" sx={{mb: 6}}>
        <Title/>

        {/* Blockを繰り返し表示 */}
        <Block title={"挨拶を返します"}/>
        <Block title={"ALの情報"}/>
        <BlockAddBtn/>

        <SaveBtn color="primary"/>
      </Container>
    </>
  );
}

export default App;
