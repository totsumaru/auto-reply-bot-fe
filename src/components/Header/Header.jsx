import React from "react";
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {ServerAvatar} from "./ServerAvatar";
import {ServerName} from "./ServerName";

// ヘッダーです
export const Header = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar>
            {/* タイトル */}
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              自動返信bot
            </Typography>

            {/* アバター */}
            <ServerAvatar/>

            {/* サーバー名 */}
            <ServerName/>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}