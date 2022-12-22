import React from "react"
import {Header} from "./components/Header";
import {Container} from "@mui/material";
import {Title} from "./components/Title";
import {Block} from "./components/Block/Block";
import {SaveBtn} from "./components/SaveBtn";

const App = () => {
  return (
    <>
      <Header/>

      {/* body全体のコンテナ */}
      <Container maxWidth="md">
        <Title/>

        {/* Blockを繰り返し表示 */}
        <Block title={"挨拶を返します"}/>
        <Block title={"ALの情報"}/>

        <SaveBtn color="success"/>
      </Container>
    </>
  );
}

export default App;
